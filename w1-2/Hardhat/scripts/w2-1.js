const hre = require("hardhat");
const { ethers, network, artifacts } = require("hardhat");
async function main(){
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();

    await bank.deployed();
    console.log('Bank  deployed to '+bank.address)
}
main()