const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} = require('@solana/web3.js');

const wallet= new Keypair();
const publicKey=new PublicKey(wallet._keypair.publicKey);
const secretKey=wallet._keypair.secretKey;

const getWalletBalance = async () => { 
    try
    {const connection = new Connection(clusterApiUrl('devnet'));
    const balance = await connection.getBalance(publicKey);
    console.log(`Your Balance is ${balance} SOL`);
    }
    catch(e)
    {
        console.log(e);
    }
   
}
const main = async () => {
    await getWalletBalance();
}

main();
