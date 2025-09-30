// /api/src/fabric/enrollAdminAndUser.ts

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function enrollAdmin() {
  const ccpPath = path.resolve(__dirname, 'connection-org1.json');
  const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
  const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
  const ca = new FabricCAServices(caURL);

  const walletPath = path.join(__dirname, 'wallet');
  const wallet = await Wallets.newFileSystemWallet(walletPath);

  const adminIdentity = await wallet.get('admin');
  if (adminIdentity) {
    console.log('Admin already exists');
    return;
  }

  const enrollment = await ca.enroll({
    enrollmentID: 'admin',
    enrollmentSecret: 'adminpw'
  });

  const x509Identity = {
    credentials: {
      certificate: enrollment.certificate,
      privateKey: enrollment.key.toBytes()
    },
    mspId: 'Org1MSP',
    type: 'X.509'
  };

  await wallet.put('admin', x509Identity);
  console.log('Admin enrolled successfully');
}

enrollAdmin();
