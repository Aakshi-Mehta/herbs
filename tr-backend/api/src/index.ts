import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { uploadBatch, getBatch, listBatches } from "./controllers/collectorController";
import multer from "multer";
import { ensureBuckets } from "./minioClient";
import { getContract } from "./fabric/fabricGateway";

const app = express();
app.use(express.json());

app.get("/api/v1/collector/batches/:batchId", getBatch);
app.get("/api/v1/collector/batches", listBatches);

export async function verifyBatchOnChain(batchId: string) {
  const { contract } = await getContract();
  const result = await contract.evaluateTransaction("QueryBatch", batchId);
  return JSON.parse(result.toString());
}

app.get("/api/v1/collector/batches/:id/onchain", async (req, res) => {
  try {
    const { contract, gateway } = await getContract();
    const result = await contract.evaluateTransaction("QueryBatch", req.params.id);
    gateway.disconnect();

    const str = result.toString();
    let data;
    try {
      data = JSON.parse(str);
    } catch {
      data = str;
    }

    res.json({ success: true, data });
  } catch (err: any) {
    console.error("Onchain query error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

(async () => {
  try {
    await ensureBuckets();
    console.log("✅ MinIO buckets verified/created.");
  } catch (err) {
    console.error("❌ MinIO bucket error:", err);
    process.exit(1);
  }

  app.get("/api/test", (req, res) => res.json({ ok: true }));

  const upload = multer(); 
  app.post("/api/v1/collector/batches", upload.single("photo"), uploadBatch);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
})();
