const web3 = require('@solana/web3.js');
const { 
  createCreateMetadataAccountV3Instruction, 
  PROGRAM_ID 
} = require('@metaplex-foundation/mpl-token-metadata');

const connection = new web3.Connection("https://api.devnet.solana.com", 'confirmed');
const payerSecretKey = Uint8Array.from([]); //payer: 91hCUiEsuGdKsZCT3wWNVb2axV2GtPwPGo9mQ3gMofVF
const payerKeypair = web3.Keypair.fromSecretKey(payerSecretKey);
//already generated last month, for perpetual test
const tokenMintPublickey = new web3.PublicKey("SuRsHWokti5MS1ckLwaqNmD8SqCUnjwamE9L6VitzW9"); //decimal 6
const name = "Another Chance"
const symbol = "YTC";
//const uriJson = "https://token-creator-lac.vercel.app/token_metadata.json";
const uriJson = "https://raw.githubusercontent.com/ytrobert/tokenMetadataSolana/main/token_metadata.json"



async function main() {
  console.log("=======================================");
  console.log("Check rpc ...");
  console.log("current slot:", await connection.getSlot());
  const metadataPDA = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      PROGRAM_ID.toBuffer(),
      tokenMintPublickey.toBuffer(),
    ],
    PROGRAM_ID,
  )[0];
  console.log("Metadata Account:", metadataPDA.toBase58()); //GXmkAwMVuNBtQLxGnDFVpQDNeDjxexQBWW4F123ExWMs
  const tokenMetadata = {
    name, 
    symbol,
    uri: uriJson,
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
  }
  const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintPublickey,
      mintAuthority: payerKeypair.publicKey,
      payer: payerKeypair.publicKey,
      updateAuthority: payerKeypair.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        data: tokenMetadata,
        isMutable: false,
        collectionDetails: null,
      },
    },
  );
  const createTokenMetadataTransaction = new web3.Transaction().add(
    createMetadataInstruction
  );
  await web3.sendAndConfirmTransaction(connection, createTokenMetadataTransaction, [payerKeypair]);
  console.log("done");

}




main();