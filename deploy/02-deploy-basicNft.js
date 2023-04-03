const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../hardhat-config-helper")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("-------------------------deployingBasicNft-------------------------")

    const args = []
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // const basicNftTwo = await deploy("BasicNftTwo", {
    //     from: deployer,
    //     args: args,
    //     log: true,
    //     waitConfirmations: waitBlockConfirmations,
    // })

    log("-------------------------verifyingBasicNft-------------------------")

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(basicNft.address, args)
        // await verify(basicNftTwo.address, args)
    }
    log("==========================finishdeploying==========================")
    log("\n\n\n")
}

module.exports.tags = ["all", "basicnft"]
