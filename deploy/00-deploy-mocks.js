const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config"); //代表整个helper-hardhat-config文件
const DECIMALS = "8";
const INITIAL_PRICE = "200000000000"; // 2000

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (chainId == 31337) {
    //如果是本地合约就部署，如果是测试网络的就不部署
    log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE], //需要给合约转递参数 构造函数需要传递参数
    });
    log("Mocks Deployed!");
    log("------------------------------------------------");
    log(
      "You are deploying to a local network, you'll need a local network running to interact"
    );
    log(
      "Please run `npx hardhat console` to interact with the deployed smart contracts!"
    );
    log("------------------------------------------------");
  } else {
    log(chainId);
  }
};

module.exports.tags = ["all", "mocks"];
