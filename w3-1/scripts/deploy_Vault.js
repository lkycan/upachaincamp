const hre = require("hardhat");
const { ethers, network, artifacts } = require("hardhat");
async function main(){
    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy('0x7a78c1744A6D0A8B75F5862B252CE4A51563470C');

    await vault.deployed();
    console.log('Vault deployed to '+vault.address)
}
main()