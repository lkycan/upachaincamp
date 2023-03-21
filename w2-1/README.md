# Sample Hardhat Project

需求：建立一个bank 合约，向改合约转账，可以调用合约取出来


```shell

npx install
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

部署到ganace 网络准备，链接小狐狸，复制私钥到  .env 文件例如
```
GOERLI_RPC_URL=
KEYOWNER="私钥1"
KEYOTHERACCOUNT="私钥2"

```
配置hardhat.config.js
```

  networks: {
      ganache:{
        url: "http://127.0.0.1:7545",//ganace 的端口号，chainId 的id，小狐也一样
        accounts: [process.env.KEYOWNER,process.env.KEYOTHERACCOUNT],
        chainId: 1337
      },
  }
```

部署到ganace
```
npx hardhat run .\scripts\bank_deploy.js --network ganache
```
显示bank地址，注意这个地址withdraw.js 用到
```
bank deployed to 0xaB2F3a2660F21D3c0648abBA594b484a70ec5B41
```

小狐狸导入私钥1，并且向bank 地址转账，等转账成功后查询 
```
npx hardhat run .\scripts\deposited.js --network ganache
 
 结果：就是你转账的金额
 BigNumber { value: "14000000000000000000" }

```
取出来，执行
```
npx hardhat run .\scripts\withdraw.js --network ganache
```
然后再查询
```
npx hardhat run .\scripts\deposited.js --network ganache

结果为
BigNumber { value: "0" }
```
最后小狐狸验证一下余额