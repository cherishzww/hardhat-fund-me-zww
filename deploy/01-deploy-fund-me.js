const { network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config"); //代表整个helper-hardhat-config文件
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //根据配置网络获取对应合约地址
  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  log("----------------------------------------------------");
  log("Deploying FundMe and waiting for confirmations...");
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`FundMe deployed at ${fundMe.address}`);

  if (chainId != 31337 && process.env.PRIVATE_KEY) {
    await verify(fundMe.address, [ethUsdPriceFeedAddress]);
  }
};

module.exports.tags = ["all", "fundme"];
