pragma solidity ^0.8.9;
// import "hardhat/console.sol";
error Unauthorized();
/**
 * @title Counter
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Counter {
    uint public counter;
    address owner;
 
    constructor(uint x) {
        counter = x;
        owner = msg.sender;
    }

    function count() public {
        if (msg.sender != owner) {
            
            revert Unauthorized();
        }else{
            require(msg.sender == owner, "invalid call");
            counter = counter + 1;
        }

        // console.log(counter);

    }
  
}