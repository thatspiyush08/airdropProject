// const {
//     Connection,
//     PublicKey,
//     clusterApiUrl,
//     Keypair,
//     LAMPORTS_PER_SOL,
//     Transaction,
//     SystemProgram,
//     sendAndConfirmTransaction
// } = require('@solana/web3.js');

// const senderWallet = new Keypair(); // Sender's wallet
// const senderPublicKey = new PublicKey(senderWallet.publicKey);

// const receiverPublicKey = new PublicKey("receiver_public_key_here"); // Receiver's public key

// const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// const getWalletBalance = async (publicKey) => {
//     try {
//         const balance = await connection.getBalance(publicKey);
//         console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
//     } catch (error) {
//         console.error("Error fetching balance:", error);
//     }
// }

// const airDrop = async (publicKey) => {
//     try {
//         const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
//         await connection.confirmTransaction(fromAirDropSignature);
//         console.log("Airdrop successful!");
//     } catch (error) {
//         console.error("Error during airdrop:", error);
//     }
// }

// const transferSol = async (senderPrivateKey, receiverPublicKey, amount) => {
//     try {
//         const transaction = new Transaction().add(
//             SystemProgram.transfer({
//                 fromPubkey: senderPublicKey,
//                 toPubkey: receiverPublicKey,
//                 lamports: amount * LAMPORTS_PER_SOL,
//             })
//         );
//         const signature = await sendAndConfirmTransaction(connection, transaction, [senderPrivateKey]);
//         console.log('Transaction successful:', signature);
//     } catch (error) {
//         console.error("Error in transfer:", error);
//     }
// }

// const main = async () => {
//     try {
//         // Display sender's wallet balance before airdrop and transfer
//         await getWalletBalance(senderPublicKey);
        
//         // Perform airdrop to sender's wallet
//         await airDrop(senderPublicKey);
        
//         // Display sender's wallet balance after airdrop
//         await getWalletBalance(senderPublicKey);

//         // Transfer SOL from sender to receiver
//         await transferSol(senderWallet.secretKey, receiverPublicKey, 1); // Change 1 to the desired amount to transfer
        
//         // Display sender's wallet balance after transfer
//         await getWalletBalance(senderPublicKey);
        
//         // Display receiver's wallet balance after transfer
//         await getWalletBalance(receiverPublicKey);
//     } catch (error) {
//         console.error("Error in main:", error);
//     }
// }

// main();
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
