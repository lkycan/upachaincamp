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