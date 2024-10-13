const { Connection, Keypair, clusterApiUrl } = require('@solana/web3.js');
const { createMint, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const fs = require('fs');

async function mintNFT() {
    // Load the payer's wallet using the secret key from the JSON file
    const payerSecretKey = Uint8Array.from(JSON.parse(fs.readFileSync("C:/metaplex/metaplex/js/solana-nft-collection/~/my-wallet.json", "utf-8")));
    const payer = Keypair.fromSecretKey(payerSecretKey);

    // Create a connection to the Solana devnet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Check wallet balance
    const balance = await connection.getBalance(payer.publicKey);
    console.log('Payer Public Key:', payer.publicKey.toBase58());
    console.log('Payer Balance (in SOL):', balance / 1000000000);

    // Create new mint
    try {
        const mint = await createMint(
            connection,
            payer, // Fee payer
            payer.publicKey, // Mint authority
            null, // Freeze authority (optional)
            0, // Number of decimals
            TOKEN_PROGRAM_ID // SPL token program ID
        );

        // Log mint account and payer information
        console.log("Mint Account:", mint.toBase58());
        console.log("Payer Keypair:", payer.publicKey.toBase58());
    } catch (error) {
        console.log('Error creating mint:', error);
    }
}

mintNFT();
