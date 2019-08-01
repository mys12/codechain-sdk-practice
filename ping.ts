import {SDK} from "codechain-sdk";


const sdk = new SDK({ 
    server: "https://corgi-rpc.codechain.io",
    networkId: "wc"

})
const myAddress = "wccqxzw8ce49ztwr8ehe0nvzytk5pmvfyrunyxm4nly";
async function main() {
    // const response = await sdk.rpc.node.ping()
    // const bestBlockNumber = await sdk.rpc.chain.getBestBlockNumber();
    // const bestBlock = await sdk.rpc.chain.getBlock(bestBlockNumber);
    //console.log(response);
    // const address = await sdk.key.createPlatformAddress();
    //console.log(address.toString());
    const tx = sdk.core.createPayTransaction({
        recipient: myAddress,
        quantity: "10000"
    });
    const seq = await sdk.rpc.chain.getSeq(myAddress);
    const signedTx = await sdk.key.signTransaction(tx, {
        account: myAddress,
        fee: 100,
        seq
    });
    const txhash = await sdk.rpc.chain.sendSignedTransaction(signedTx);
    console.log(txhash);
}

main();