const { Keypair, PublicKey, Connection, Transaction, sendAndConfirmTransaction, SystemProgram } = require('@solana/web3.js');
const fs = require('fs');

async function testBasicTransaction() {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    // Load the keypair from the wallet file
    let payerSecretKey;
    try {
        payerSecretKey = Uint8Array.from(JSON.parse(fs.readFileSync("C:/metaplex/metaplex/js/solana-nft-collection/~/my-wallet.json", "utf-8")));
    } catch (error) {
        console.error("Error reading wallet file:", error);
        return;
    }
    
    const payer = Keypair.fromSecretKey(payerSecretKey);

    if (!payer || !payer.publicKey) {
        console.error("Error: Payer is undefined or invalid.");
        return;
    }

    // Create a transaction to send 0.001 SOL to another address (use any valid Solana address here)
    const recipient = new PublicKey("DABHdHYS8cbLkgxho9kUR6xk7NWq28V6jmAuevcMKeCk");
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: recipient,
            lamports: 1000000 // 0.001 SOL
        })
    );

    transaction.feePayer = payer.publicKey;

    // Set the recent blockhash
    try {
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
    } catch (error) {
        console.error("Error fetching latest blockhash:", error);
        return;
    }

    // Log transaction details before signing
    console.log("Transaction Details (Before Signing):", JSON.stringify(transaction, null, 2));
    console.log("Payer Public Key:", payer.publicKey.toBase58());

    // Try sending the transaction
    try {
        const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
        console.log("Transaction successful with signature:", signature);
    } catch (error) {
        console.error("Transaction failed:", error);
    }
}

testBasicTransaction().catch(console.error);
