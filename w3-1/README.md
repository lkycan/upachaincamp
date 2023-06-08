发一个erc20 token，数量10000

写一个金库合约，可以存，取 发行的erc20 token
映射浏览器调试
remixd -s .\w3-1\contracts\ -u https://remix.ethereum.org
实现
MyToken.sol   // 部署后获得   0x5FbDB2315678afecb367f032d93F642f64180aa3
```
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {

    constructor() ERC20(unicode"我发行的币", "MyToken") {
        _mint(msg.sender, 10000 * 10 ** 18);
    }


}
```


Vault合约  部署的时候要传上面的token 地址做为参数                  部署后获得  0x5FbDB2315678afecb367f032d93F642f64180aa3
```
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Vault {
    mapping(address => uint256) private deposits;
    IERC20 public immutable token;

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function deposit(address user, uint amount) public {
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Transfer from error");
        deposits[user] += amount;
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(deposits[msg.sender] >= amount, "Insufficient balance");

        // Update the deposit amount for the sender
        deposits[msg.sender] -= amount;

        // Transfer tokens from the contract to the sender
        token.transfer(msg.sender, amount);
    }

    function getDepositBalance(address account) external view returns (uint256) {
        return deposits[account];
    }
}

```
注意部署Vault的时候，把MyToken 的地址作为参数传过去

//已经部署到
goerli

MyToken 合约
0x7a78c1744A6D0A8B75F5862B252CE4A51563470C
vault 合约
0x3D6676Cc932155eEf0E7773E68F9CBf574c186B5
npx hardhat verify  合约


sepolia
0x9A27d2164f457C25d742e1be12882139164006B2



验证
```
npx hardhat verify 0x7a78c1744A6D0A8B75F5862B252CE4A51563470C  --contract  contracts/MyToken.sol:MyToken --network goerli 

npx hardhat verify 0x3D6676Cc932155eEf0E7773E68F9CBf574c186B5 --contract  contracts/Vault.sol:Vault 0x7a78c1744A6D0A8B75F5862B252CE4A51563470C --network goerli 
```

在 hardhat.config.js 中添加以下代码：
```

const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:7890");
setGlobalDispatcher(proxyAgent);
```
以上代码用来告诉程序按照本地代理链接网络。

记得安装 undici 依赖包：
```

npm install --save-dev undici
```
按照以上方法，可以顺利部署并测试合约。

部署 nft721
```
npx hardhat run .\scripts\deploy_NFT271.js --network goerli 
myERC721 deployed to 0xC399d3974d5E401c85dAE02609573cb2B19Cf817

npx hardhat verify 0xC399d3974d5E401c85dAE02609573cb2B19Cf817 --contract  contracts/MyERC721.sol:MyERC721 --network goerli 
```

部署 nft 交易
```
npx hardhat run .\scripts\deploy_NFTMarket.js --network goerli 
nFTMarket deployed to 0x5655a44606bA46634eBE2466019d8069748FAdAD
npx hardhat verify 0x5655a44606bA46634eBE2466019d8069748FAdAD --contract  contracts/NFTMarket.sol:NFTMarket 0x7a78c1744A6D0A8B75F5862B252CE4A51563470C 0xC399d3974d5E401c85dAE02609573cb2B19Cf817 --network goerli 

https://goerli.etherscan.io/address/0x5655a44606bA46634eBE2466019d8069748FAdAD#code
```

https://app.pinata.cloud/   上传图片
