const { ethers, network, artifacts } = require("hardhat");


async function main() {
  let bank = await ethers.getContractAt("Bank",
    "0xaB2F3a2660F21D3c0648abBA594b484a70ec5B41");

    let tx = await bank.withdraw();
    // await tx.wait();

    console.log(tx)

}

main();