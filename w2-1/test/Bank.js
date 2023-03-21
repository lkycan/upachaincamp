const { expect } = require("chai");

let bank;
let owner, otherAccount;

describe("Bank", function () {
  async function init() {
    [owner, otherAccount] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
    await bank.deployed();
    console.log("bank:" + bank.address);
  }

  before(async function () {
    await init();
  });

  it("myDeposited", async function () {
    let other2 = bank.connect(otherAccount);
    // await bank.connect(other2).depositEth(100, { value: 100 });
    expect(await other2.myDeposited()).to.equal(100);
    });

});