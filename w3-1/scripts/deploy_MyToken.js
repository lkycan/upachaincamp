const hre = require("hardhat");
const { ethers, network, artifacts } = require("hardhat");
async function main(){
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();

    await myToken.deployed();
    console.log('myToken deployed to '+myToken.address)
}
main()