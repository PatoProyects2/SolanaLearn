// client.js is used to introduce the reader to generating clients from IDLs.
// It is not expected users directly test with this example. For a more
// ergonomic example, see `tests/basic-0.js` in this workspace.

const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

// Configure the local cluster.
const provider = anchor.Provider.local("https://api.devnet.solana.com");
anchor.setProvider(provider);


async function main() {
  // #region main
  // Read the generated IDL.
  const idl = JSON.parse(
    require("fs").readFileSync("./target/idl/basic_2.json", "utf8")
  );
  
  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey("6ueBxDoKpoEDLXfAEz8rQEcNPQjwutysgx3JoKGnRNnv");
  const counter = anchor.web3.Keypair.generate();
  
  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);
  //await program.rpc.initializex(new anchor.BN(1234));

  // Execute the RPC.
  /*
  await program.rpc.create(provider.wallet.publicKey, {
    accounts: {
      counter: counter.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [counter],
  });*/
  
  //FPfVsgMNBhmXeYBLi33iCpVwbYTfvThM1Qez888ukzMu
  
  await program.rpc.increment(new anchor.BN(100),{
    accounts: {
      counter: "EzC1XzB78Ym45wqMYhB6rpnQBRakb5cxix4wFxhvX7Fh",
      authority: provider.wallet.publicKey,
    },
  });
  
  // #endregion main
}

console.log("Running client.");
main().then(() => console.log("Success, you are amazing"));