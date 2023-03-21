const { expect } = require("chai");

let myToken;
let vault;
let owner, otherAccount;

describe("Score", function () {
  async function init() {
    [owner, otherAccount] = await ethers.getSigners();
    
    //发布myToken
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy();

    await myToken.deployed();
    console.log('myToken deployed to '+myToken.address)


    // 发布Vault 合约
    const Vault = await ethers.getContractFactory("Vault");
    vault = await Vault.deploy(myToken.address);

    await vault.deployed();
    console.log('Vault deployed to '+vault.address)
  }

  before(async function () {
    await init();
  });

  //授权
  it("Approve", async function () {

    let ownerMyToken = myToken.connect(owner);
    // await bank.connect(other2).depositEth(100, { value: 100 });
    // await Teacher.deploy("0xD9edB9ca81267F57744b38d71C01147549f9f526");
    await ownerMyToken.approve(vault.address,1000000)

  });
    //存
  it("deposite", async function () {
    let ownerVault = vault.connect(owner);
    await ownerVault.deposit(owner.address,10000)
    expect(await ownerVault.getDepositBalance(owner.address)).to.equal(10000);

  });
  //取
  it("withdraw", async function () {
    let ownerVault = vault.connect(owner);
    await ownerVault.withdraw(1)
    expect(await ownerVault.getDepositBalance(owner.address)).to.equal(9999);
  });

//   getDepositBalance

});