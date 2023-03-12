const { expect } = require("chai");

let counter;
let owner, otherAccount;

describe("Counter", function () {
  async function init() {
    [owner, otherAccount] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();
    console.log("counter:" + counter.address);
  }

  before(async function () {
    await init();
  });

  // 
  it("init equal 0",async function(){
    expect(await counter.counter()).to.equal(0)
  })

});