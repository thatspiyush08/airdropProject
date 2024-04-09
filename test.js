const express = require('express');
const bodyParser = require('body-parser');
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction
} = require('@solana/web3.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Solana connection
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Dummy wallet for demonstration
const senderWallet = new Keypair();
const senderPublicKey = new PublicKey(senderWallet.publicKey);

// Dummy receiver public key
const receiverPublicKey = new PublicKey("receiver_public_key_here");

// Function to get wallet balance
const getWalletBalance = async (publicKey) => {
    try {
        const balance = await connection.getBalance(publicKey);
        return { balance: balance / LAMPORTS_PER_SOL };
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
};

// Function to perform airdrop
const airDrop = async (publicKey) => {
    try {
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature);
        console.log("Airdrop successful!");
    } catch (error) {
        console.error("Error during airdrop:", error);
        throw error;
    }
};

// Function to transfer SOL
const transferSol = async (senderPrivateKey, receiverPublicKey, amount) => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: senderPublicKey,
                toPubkey: receiverPublicKey,
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );
        const signature = await sendAndConfirmTransaction(connection, transaction, [senderPrivateKey]);
        console.log('Transaction successful:', signature);
    } catch (error) {
        console.error("Error in transfer:", error);
        throw error;
    }
};

// Endpoint to get wallet balance
app.post('/balance', async (req, res) => {
    try {
        const { publicKey } = req.body;
        const balance = await getWalletBalance(new PublicKey(publicKey));
        res.json(balance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get balance' });
    }
});

// Endpoint to perform airdrop
app.post('/airdrop', async (req, res) => {
    try {
        await airDrop(senderPublicKey);
        res.json({ message: 'Airdrop successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to perform airdrop' });
    }
});

// Endpoint to transfer SOL
app.post('/transfer', async (req, res) => {
    const { receiverPublicKey, amount } = req.body;
    try {
        await transferSol(senderWallet.secretKey, new PublicKey(receiverPublicKey), amount);
        res.json({ message: 'Transfer successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to transfer SOL' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
