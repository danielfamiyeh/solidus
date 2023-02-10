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
    it('should create and retrieve a user account', async () => {
      await testSolidusContract.userSignUp('kwaks', '');

      const user = await testSolidusContract.getUser(
        impersonateDeployer.address
      );

      assert.equal(user.name, 'kwaks');
      assert.equal(user.addr, impersonateDeployer.address.toString());
    });

    it('should update a user account', async () => {
      await testSolidusContract.userSignUp('kwaks', '');
      await testSolidusContract.userUpdate('daniel', 'a link to an image');

      const user = await testSolidusContract.getUser(
        impersonateDeployer.address
      );

      assert.equal(user.name, 'daniel');
      assert.equal(user.avatar, 'a link to an image');
    });

    it('should delete a user account', async () => {
      await testSolidusContract.userSignUp('kwaks', '');
      await testSolidusContract.userDelete();

      const user = await testSolidusContract.getUser(
        impersonateDeployer.address
      );

      assert.notEqual(user.addr, impersonateDeployer.address);
    });
  });
});
