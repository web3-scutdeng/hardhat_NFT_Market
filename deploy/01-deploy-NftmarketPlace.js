const { network } = require("hardhat")
const { NomicLabsHardhatPluginError } = require("hardhat/plugins")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../hardhat-config-helper")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(deployer)

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("--------------------------deployingMarket--------------------------")
    const arguments = []
    const nftMarketplace = await deploy("NftMarketplace", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log("--------------------------verifyingMarket--------------------------")
    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(nftMarketplace.address, arguments)
    }
    log("==========================finishdeploying==========================")
    log("\n\n\n")
}

module.exports.tags = ["all", "nftmarketplace"]
