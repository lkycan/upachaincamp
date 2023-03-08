pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Counter
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Counter {
    uint public counter;
    constructor(){
        counter = 0;
    }

    function add(uint a,uint b) public {
        counter = a+b;
    }

  
}