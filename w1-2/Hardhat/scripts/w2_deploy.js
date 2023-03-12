const hre = require("hardhat");
const { ethers, network, artifacts } = require("hardhat");
async function main(){
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    await counter.deployed();
    console.log('counter deployed to '+counter.address)
}
main()