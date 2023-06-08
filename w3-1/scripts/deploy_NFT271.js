const hre = require("hardhat");
const { ethers, network, artifacts } = require("hardhat");
async function main(){
    const MyERC721 = await ethers.getContractFactory("MyERC721");
    //传入address _token, address _nftToken
    const myERC721 = await MyERC721.deploy();
    await myERC721.deployed();
    console.log('myERC721 deployed to '+myERC721.address)
}
main()