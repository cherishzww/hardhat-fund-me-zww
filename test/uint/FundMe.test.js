const { deployments, ethers } = require("hardhat");
const { assert } = require("chai");

describe("FundMe", async function () {
  let fundMe;
  let deployer;
  let mockV3aggregator;
  //先部署合约，测试之前，用hardhat-deploy
  //deployments有个fixture方法，可以获取deploy文件夹下所有信息，可以使用我们定义的标签tag
  beforeEach(async () => {
    // const accounts = await ethers.getSigners()  从配置文件获取账户，和下面的方法二选一
    // deployer = accounts[0]
    deployer = (await getNamedAccounts()).deployer; //获取部署账户
    console.log(deployer);
    await deployments.fixture(["all"]); //部署全部合约
    fundMe = await ethers.getContract("FundMe", deployer); //hardhat-deploy封装了一个方法可以获取合约的最新部署
    mockV3aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  }); //并和账户关联上

  describe("constructor", async function () {
    it("ce shi  gou zao han shu", async function () {
      console.log(fundMe.target);
      const resposne = await fundMe.getPriceFeed(); //检查构造函数地址对不对
      console.log(resposne);
      console.log(mockV3aggregator.target);
      assert.equal(resposne, mockV3aggregator.target);
    });
  });

  describe("owner", async function () {
    it("ces shi  owner ", async function () {
      const owner = await fundMe.getOwner(); //检查构造函数地址对不对
      assert.equal(owner, deployer);
    });
  });
});
