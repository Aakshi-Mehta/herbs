//  /api/src/controllers/collectorController.ts

import { Request, Response } from "express";
import db from "../db";
import { minioClient } from "../minioClient";
import crypto from "crypto";
import axios from "axios";
import FormData from "form-data";
import { addHerbBatchToBlockchain } from "../fabric/fabricService";
import QRCode from "qrcode";

async function getEmbedding(fileBuffer: Buffer) {
  const formData = new FormData();
  formData.append("file", fileBuffer, { filename: "photo.jpg" });

  const res = await axios.post("http://127.0.0.1:5000/embed", formData, {
    headers: formData.getHeaders(),
  });
  return res.data; // { embedding, hash, vectorId }
}
// Get single batch by batchId
export async function getBatch(req: Request, res: Response) {
  try {
    const batchId = req.params.batchId.trim(); 
    const result = await db.query(
      `SELECT * FROM batches WHERE batch_id = $1`,
      [batchId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Batch not found" });

    res.json({ success: true, batch: result.rows[0] });
  } catch (err: any) {
    console.error("Error fetching batch:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// List batches by herb type or date
export async function listBatches(req: Request, res: Response) {
  try {
    const { herbType, startDate, endDate } = req.query;

    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (herbType) {
      conditions.push(`herb_type = $${idx++}`);
      values.push(herbType);
    }
    if (startDate) {
      conditions.push(`collected_at >= $${idx++}`);
      values.push(startDate);
    }
    if (endDate) {
      conditions.push(`collected_at <= $${idx++}`);
      values.push(endDate);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const result = await db.query(`SELECT * FROM batches ${whereClause} ORDER BY collected_at DESC`, values);

    res.json({ success: true, batches: result.rows });
  } catch (err: any) {
    console.error("Error listing batches:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function uploadBatch(req: Request, res: Response) {
  try {
    const { herbType, gpsLat, gpsLong, collectedAt, quantity } = req.body;
    const batchId = crypto.randomUUID().trim();

    
    const qrCodeDataUrl = await QRCode.toDataURL(batchId);

    let imageUrl: string | null = null;
    if (req.file) {
      const file = req.file;
      const objectName = `herb-photos/${batchId}.jpg`;
      await minioClient.putObject("herb-photos", objectName, file.buffer);
      const url = await minioClient.presignedGetObject("herb-photos", "test.jpg", 60);
      console.log(url);

      imageUrl = await minioClient.presignedGetObject(
        "herb-photos",
        objectName,
        60 * 60
      );

      // Get embedding
      const embeddingData = await getEmbedding(file.buffer);
      const embeddingHash = embeddingData.hash;

      console.log("Embedding hash ready for blockchain:", embeddingHash);

      await addHerbBatchToBlockchain({
        batchId,
        herbType,
        region: "UnknownRegion",
        quantityKg: parseFloat(quantity),
        embeddingHash: embeddingData.hash,
        photoUrl: imageUrl!
      });
    }

    // Save batch to DB
    const result = await db.query(
      `INSERT INTO batches 
        (batch_id, herb_type, gps_lat, gps_long, collected_at, quantity, image_url) 
       VALUES ($1,$2,$3,$4,$5,$6,$7) 
       RETURNING *`,
      [batchId, herbType, gpsLat, gpsLong, collectedAt, quantity, imageUrl]
    );

    res.status(201).json({ success: true, batch: result.rows[0], qrCode: qrCodeDataUrl });
  } catch (err: any) {
    console.error("Error saving batch:", err);
    res.status(500).json({ success: false, error: err.message });
  }
  
}
