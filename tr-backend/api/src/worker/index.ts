import { startBlockchainWorker } from "./blockchainWorker";

(async () => {
  try {
    await startBlockchainWorker();
  } catch (err) {
    console.error("Worker failed:", err);
    process.exit(1);
  }
})();
