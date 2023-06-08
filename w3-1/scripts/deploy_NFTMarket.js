const hre = require("hardhat");
const { ethers, network, artifacts } = require("hardhat");
async function main(){
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    //传入address _token, address _nftToken
    const nFTMarket = await NFTMarket.deploy('0x7a78c1744A6D0A8B75F5862B252CE4A51563470C','0xC399d3974d5E401c85dAE02609573cb2B19Cf817');
    await nFTMarket.deployed();
    console.log('nFTMarket deployed to '+nFTMarket.address)
}
main()