const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('User test suite', function () {
  let deployer, impersonateDeployer, testSolidusContract;

  this.beforeEach(async () => {
    const testSolidusFactory = await ethers.getContractFactory('Solidus', 0);
    testSolidusContract = await testSolidusFactory.deploy();

    await testSolidusContract.deployed();
    deployer = await testSolidusContract.getOwner();

    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [deployer.toString()],
    });

    impersonateDeployer = await ethers.getSigner(deployer.toString());
  });

  describe('CRUD methods', () => {
    it('should', () => {
      console.log({ deployer });
    });
  });
});
