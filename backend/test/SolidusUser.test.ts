(() => {
  const { assert } = require('chai');
  const { network, ethers } = require('hardhat');
  const { describe, it } = require('mocha');

  describe('User test suite', function () {
    let deployer, impersonateDeployer, testSolidusContract;

    this.beforeEach(async () => {
      const testSolidusFactory = await ethers.getContractFactory('Solidus', 0);
      testSolidusContract = await testSolidusFactory.deploy();

      await testSolidusContract.deployed();
      deployer = await testSolidusContract.getOwner();

      await network.provider.request({
        method: 'hardhat_impersonateAccount',
        params: [deployer.toString()],
      });

      impersonateDeployer = await ethers.getSigner(deployer.toString());
    });

    describe('CRUD methods', () => {
      it('should create and retrieve a user account', async () => {
        await testSolidusContract.userAuth();

        const user = await testSolidusContract.getUser(
          impersonateDeployer.address
        );

        assert.equal(user.addr, impersonateDeployer.address.toString());
      });

      it('should update a user account', async () => {
        await testSolidusContract.userAuth();
        await testSolidusContract.userUpdate(
          'daniel',
          'a link to an image',
          'a link to a cover photo',
          'test bio'
        );

        const user = await testSolidusContract.getUser(
          impersonateDeployer.address
        );

        assert.equal(user.name, 'daniel');
        assert.equal(user.avatar, 'a link to an image');
        assert.equal(user.coverPhoto, 'a link to a cover photo');
        assert.equal(user.bio, 'test bio');
      });

      it('should delete a user account', async () => {
        await testSolidusContract.userAuth();
        await testSolidusContract.userDelete();

        const user = await testSolidusContract.getUser(
          impersonateDeployer.address
        );

        assert.notEqual(user.addr, impersonateDeployer.address);
      });
    });
  });
})();
