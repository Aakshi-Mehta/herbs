// /api/src/fabric/fabricService.ts
import { getContract } from "./fabricGateway";

export async function addHerbBatchToBlockchain(batch: any) {
  console.log("MOCK: Batch submitted to blockchain:", batch.batchId);
  return true; // pretend it succeeded
}
//  {
//   const { contract, gateway } = await getContract();

//   try {
//     await contract.submitTransaction(
//       "AddHerbBatch",
//       batch.batchId,
//       batch.herbType,
//       batch.region,
//       batch.quantityKg.toString(),
//       batch.embeddingHash,
//       batch.photoUrl
//     );
//     console.log("Batch successfully submitted to blockchain:", batch.batchId);
//   } finally {
//     gateway.disconnect();
//   }
// }
