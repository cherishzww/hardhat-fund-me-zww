const networkConfig = {
  80001: {
    name: "polygon",
    ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  },
  // Price Feed Address, values can be obtained at https://docs.chain.link/data-feeds/price-feeds/addresses
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
};

const developmentChains = ["hardhat", "localhost"]; //如果是默认网络就是localhost

module.exports = {
  networkConfig,
  developmentChains,
};
