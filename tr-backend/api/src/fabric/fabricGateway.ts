// /api/src/fabric/fabricGateway.ts

import { Gateway, Wallets } from "fabric-network";
import * as fs from "fs";
import * as path from "path";

const ccpPath = path.resolve(__dirname, "connection-org1.json");
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

export async function getContract() {
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);

  const identity = await wallet.get("appUser");
  if (!identity) {
    throw new Error("Identity not found in wallet: appUser");
  }

  const gateway = new Gateway();
  await gateway.connect(ccp, { wallet, identity: "appUser", discovery: { enabled: true, asLocalhost: true } });

  const network = await gateway.getNetwork("herbchannel");
  const contract = network.getContract("herbcc"); 
  return { contract, gateway };
}
