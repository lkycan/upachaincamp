pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {

    constructor() ERC20(unicode"我发行的币", "MyToken") {
        _mint(msg.sender, 10000 * 10 ** 18);
    }

}