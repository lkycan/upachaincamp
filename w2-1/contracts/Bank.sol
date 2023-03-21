pragma solidity ^0.8.9;
import "hardhat/console.sol";
contract Bank {

    address public owner;
    mapping(address => uint) public deposits;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    receive() external payable {
        deposits[msg.sender] += msg.value;
    }

    function myDeposited() public view returns(uint) {
        console.log('myDeposited');
        console.log(deposits[msg.sender]);
        return deposits[msg.sender];
    }

    function withdraw() public {
        console.log(deposits[msg.sender]);
        (bool success, ) = msg.sender.call{value: deposits[msg.sender]}(new bytes(0));
        require(success, 'ETH transfer failed');
        deposits[msg.sender] = 0;
    }

    function  withdrawAll() public onlyOwner {
        console.log('withdrawAll');
        uint b = address(this).balance;
        console.log(owner);
        console.log(b);
        payable(owner).transfer(b);
    }

}
