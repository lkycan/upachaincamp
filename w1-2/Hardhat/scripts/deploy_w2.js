const { ethers } = require("hardhat");
const hre = require("hardhat");
let owner,otherAccount;

async function main(){
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(0);

    await counter.deployed();
    console.log("Counter deploy to :",counter.address)
    const [ owner,otherAccount ] = await hre.ethers.getSigners();
    //调用合约方法
    // let txn = await counter.connect(owner).count();
    // console.log("count");

    // await txn.wait(); //等待mint结束
    // console.log(txn);


 
    let txn2 = await counter.connect(otherAccount).count();
    console.log("other ");

    await txn2.wait(); //等待mint结束
    console.log(txn2);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });