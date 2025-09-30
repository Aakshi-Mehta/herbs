// api/src/minioClient.ts
import { Client } from "minio";
import dotenv from "dotenv";

dotenv.config();

export const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT || "9000"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
});

export async function ensureBuckets() {
  const bucket = "herb-photos";
  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    await minioClient.makeBucket(bucket);
    console.log(`✅ Bucket created: ${bucket}`);
  } else {
    console.log(`✅ Bucket exists: ${bucket}`);
  }
}
