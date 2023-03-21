const { run } = require("hardhat")

async function verify(contractAddress, args) {
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgument: args,
        })
    } catch (e) {
        console.log(e)
    }
}

verify("0x7a78c1744A6D0A8B75F5862B252CE4A51563470C", [])