const { ethers } = require("hardhat")
const PRICE = ethers.utils.parseEther("0.1")
async function mintAndList() {
    const basicNft = await ethers.getContract("BasicNft")
    const NFTMarket = await ethers.getContract("NftMarketplace")
    console.log("minting...")
    const mintx = await basicNft.mintNft()
    const minttxReciept = await mintx.wait(1)
    console.log("------------------got token_id------------------")
    const TOKEN_ID = minttxReciept.events[0].args.tokenId
    console.log("------------------Approving NFT-----------------")
    const Approvetx = await basicNft.approve(NFTMarket.address, TOKEN_ID)
    await Approvetx.wait(1)
    console.log("-------------------Listing NFT------------------")
    const tx = await NFTMarket.listItem(basicNft.address, TOKEN_ID, PRICE)
    await tx.wait(1)
    console.log("--------------------Listed!!!-------------------")
}

mintAndList()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
