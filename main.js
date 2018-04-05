const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timeStamp, data, previousHash = ''){
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.timeStamp+ JSON.stringify(this.data) + this.nounce + this.previousHash).toString();
    }

    mineBlock(diffculty){
        while(this.hash.substring(0, diffculty) !== Array(diffculty + 1).join("0")){
            this.nounce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
       
}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.diffculty = 4;
    }

    createGenesisBlock(){
        return new Block(0,"3/4/2018 12.23am","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.diffculty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let yueSin = new BlockChain();

console.log("Mining Block 1...");
yueSin.addBlock(new Block(1, "4/3/18 12.34am", {amount: 25}));

console.log("Mining Block 2...");
yueSin.addBlock(new Block(2, "4/3/18 12.36am", {amount: 50}));

//console.log(JSON.stringify(yueSin, null, 4));
