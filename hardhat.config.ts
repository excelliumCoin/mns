import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    monad: {
      url: "https://testnet-rpc.monad.xyz",
      chainId: 10143,
      accounts: ["b19bbec31da33876bd4b590cc889f843aad38c53b8e99f0798a67db9cc28550d"],
    },
  },
}

export default config
