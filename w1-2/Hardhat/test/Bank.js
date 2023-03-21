const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Bank", function () {
    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        //部署合约的作者地址
        console.log("deloyed owner address:" + owner.address)
        //随意生成的一个地址
        console.log("otherAccount:" + otherAccount.address)
        //ethers.js中的ContractFactory是用于部署新智能合约的抽象，因此此处的Counter是用来实例合约的工厂。
        const Bank = await ethers.getContractFactory("Bank");
        //在ContractFactory上调用deploy()将启动部署，并返回解析为Contract的Promise。 该对象包含了智能合约所有函数的方法。
        const bank = await Bank.deploy();
        await bank.deployed();
        //bank合约地址
        console.log("bank contract address:" + bank.address)
        return { bank, owner, otherAccount };
    }



    it("deposit 100 to bank and verify", async function () {
        const { bank, owner, otherAccount } = await loadFixture(init);
        //{ value: 100 }表示tx的value，即msg.value。想让合约有余额，必须这样写
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        expect(await bank.connect(otherAccount).getBalanceOfEth()).to.equal(100);
    });


    it("getAllBalanceEth", async function () {
        const { bank, otherAccount } = await loadFixture(init);
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        expect(await bank.connect(otherAccount).getAllBalanceEth()).to.equal(200);
    });

    it("getAllBalanceEth002", async function () {

        const { bank, owner, otherAccount } = await loadFixture(init);
        const amount = ethers.utils.parseEther("1");
        const tx = { value: amount, to: bank.address };
        const receipt = await otherAccount.sendTransaction(tx);
        await receipt.wait();//等待链上确认交易

        let bankcontract = await ethers.getContractAt("Bank",
            "0x5FbDB2315678afecb367f032d93F642f64180aa3");

        expect(await bank.connect(otherAccount).getAllBalanceEth()).to.equal(ethers.utils.parseEther("1"));

    });


    it("transfer:deposit 100wei to bank and withdraw 100wei success", async function () {
        const { bank, owner, otherAccount } = await loadFixture(init);
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        await bank.connect(otherAccount).withdrawEth();
        expect(await bank.connect(otherAccount).getBalanceOfEth()).to.equal(0);

    });

    it("transfer,set withdraw amount:deposit 10 ether to bank and withdraw 1 ether success", async function () {
        const { bank, owner, otherAccount } = await loadFixture(init);
        //合约持有者初始的ether数量
        console.log("---owner:%s, balance:%s", owner.address, ethers.utils.formatEther(await bank.connect(owner).getbankOwnerBalanceEth()) + " ether");
        await bank.connect(owner).depositEth(ethers.utils.parseEther('10'), { value: ethers.utils.parseEther('10') });
        //存入10个ether，合约持有者初始的ether数量-10 ether- gas
        console.log("---owner:%s, balance:%s", owner.address, ethers.utils.formatEther(await bank.connect(owner).getbankOwnerBalanceEth()) + " ether");

        await bank.connect(owner).withdrawEth001(ethers.utils.parseEther('1'));
        //提取了1个ether，合约持有者初始的ether数量+1 ether- gas，为什么减少了gas，待查找 todo
        console.log("---owner:%s, balance:%s", owner.address, ethers.utils.formatEther(await bank.connect(owner).getbankOwnerBalanceEth()) + " ether");

        //存款还有9个ether
        expect(await bank.connect(owner).getBalanceOfEth()).to.equal(ethers.utils.parseEther('9'));

    });

    it("call:deposit 100 to bank and withdraw 100 success", async function () {
        const { bank, owner, otherAccount } = await loadFixture(init);
        await bank.connect(otherAccount).depositEth(100, { value: 100 });
        await bank.connect(otherAccount).withdrawEthCall(100);
        expect(await bank.connect(otherAccount).getBalanceOfEth()).to.equal(0);

    });

    it("otherAccount deposit 10 ether to bank and bank withdraw all to owner success", async function () {
        //普通用户将钱存入合约，然后将合约的所有以太坊提取到部署者地址。虽然合约数据库里显示用户的存款还在。但已经无法提取存款了，准备金没有了或者不足
        const { bank, owner, otherAccount } = await loadFixture(init);
        console.log("---otherAccount:%s, balance:%s", otherAccount.address, ethers.utils.formatEther(await bank.connect(otherAccount).getbankOwnerBalanceEth()) + " ether");

        await bank.connect(otherAccount).depositEth(ethers.utils.parseEther('10'), { value: ethers.utils.parseEther('10') });
        console.log("---owner:%s, balance:%s", owner.address, ethers.utils.formatEther(await bank.connect(owner).getbankOwnerBalanceEth()) + " ether");
        await bank.connect(owner).bankOwnerWithdraw();
        console.log("---owner:%s, balance:%s", owner.address, ethers.utils.formatEther(await bank.connect(owner).getbankOwnerBalanceEth()) + " ether");

        //合约里的用户存款还在。但无法提取了
        expect(await bank.connect(otherAccount).getBalanceOfEth()).to.equal(ethers.utils.parseEther('10'));
        //无法提取，报错： Error: Transaction reverted: function call failed to execute
        //await bank.connect(otherAccount).withdrawEth();
        try{
        await bank.connect(otherAccount).withdrawEth();
        }catch(error){
            expect(error).an("Error");
            console.log("--------------"+error);
            //expect(error).include("Error: Transaction reverted: function call failed to execute");
        }
    });
})