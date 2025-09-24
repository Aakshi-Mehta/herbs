import { getContract } from "../fabric/fabricGateway";
import db from "../db";
import { ContractListener, ContractEvent } from "fabric-network";

export async function startBlockchainWorker() {
  const { contract } = await getContract();

  console.log("Worker listening for Fabric events...");

  const listener: ContractListener = async (event: ContractEvent) => {
    try {
      if (!event.payload) {
        console.warn(`⚠️ Event ${event.eventName} had no payload, skipping.`);
        return;
      }

      // Get payload from event
      const payload = JSON.parse(event.payload.toString());

      const txId = event.getTransactionEvent().transactionId;

      if (event.eventName === "HerbBatchCreated") {
        console.log("New HerbBatchCreated event:", payload, "TX:", txId);

        await db.query(
          `INSERT INTO batches (batch_id, herb_type, gps_lat, gps_long, collected_at, quantity, image_url, blockchain_tx)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           ON CONFLICT (batch_id) DO UPDATE 
           SET blockchain_tx = $8`,
          [
            payload.batchId,
            payload.herbType,
            payload.gpsLat,
            payload.gpsLong,
            payload.collectedAt,
            payload.quantity,
            payload.photoUrl,
            txId,
          ]
        );
      }
    } catch (err) {
      console.error("Error handling event:", err);
    }
  };

  await contract.addContractListener(listener);
}
