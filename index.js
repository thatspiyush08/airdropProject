const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} = require('@solana/web3.js');

const wallet = new Keypair();
const publicKey = new PublicKey(wallet.publicKey);
const secretKey = wallet.secretKey;

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const balance = await connection.getBalance(publicKey);
        console.log(`Your Balance is ${balance / LAMPORTS_PER_SOL} SOL`);
    }
    catch (e) {
        console.error("Error fetching balance:", e);
    }
}

const airDrop = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'));
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature);
        console.log("Airdrop successful!");
    }
    catch (e) {
        console.error("Error during airdrop:", e);
    }
}

const main = async () => {
    await getWalletBalance();
    await airDrop();
    await getWalletBalance();
}

main();
