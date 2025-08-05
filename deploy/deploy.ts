import { ethers } from "hardhat"

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log("Deploying with address:", deployer.address)

  const ContractFactory = await ethers.getContractFactory("ScratchCard")
  const contract = await ContractFactory.deploy()

  await contract.waitForDeployment()

  console.log("Contract deployed at:", await contract.getAddress())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
