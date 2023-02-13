(() => {
  const { assert } = require('chai');
  const { network, ethers } = require('hardhat');
  const { describe, it } = require('mocha');

  describe('User test suite', function () {
    const user2Address = '0x00000000219ab540356cBB839Cbe05303d7705Fa';
    let deployer, impersonateDeployer, impersonateUser2, testSolidusContract;

    this.beforeEach(async () => {
      const testSolidusFactory = await ethers.getContractFactory('Solidus', 0);
      testSolidusContract = await testSolidusFactory.deploy();

      await testSolidusContract.deployed();
      deployer = await testSolidusContract.getOwner();

      await network.provider.request({
        method: 'hardhat_impersonateAccount',
        params: [deployer],
      });

      impersonateUser2 = await ethers.getSigner(user2Address);
      impersonateDeployer = await ethers.getSigner(deployer);
    });

    describe('CRUD methods', () => {
      it('should create and retrieve a user account', async () => {
        await testSolidusContract.userAuth();

        const user = await testSolidusContract.getUser(deployer);

        assert.equal(user.addr, deployer);
      });

      it('should update a user account', async () => {
        await testSolidusContract.userAuth();
        await testSolidusContract.userUpdate(
          'daniel',
          'a link to an image',
          'a link to a cover photo',
          'test bio'
        );

        const user = await testSolidusContract.getUser(deployer);

        assert.equal(user.name, 'daniel');
        assert.equal(user.avatar, 'a link to an image');
        assert.equal(user.coverPhoto, 'a link to a cover photo');
        assert.equal(user.bio, 'test bio');
      });

      it('should delete a user account', async () => {
        await testSolidusContract.userAuth();
        await testSolidusContract.userDelete();

        const user = await testSolidusContract.getUser(deployer);

        assert.notEqual(user.addr, deployer);
      });

      it('should allow users to follow/unfollow each other', async () => {
        await testSolidusContract.userAuth(); // Sign deployer up
        await hre.network.provider.request({
          method: 'hardhat_stopImpersonatingAccount',
          params: [deployer],
        });
        await network.provider.request({
          method: 'hardhat_impersonateAccount',
          params: [user2Address],
        });

        await testSolidusContract.connect(impersonateUser2).userAuth();

        await testSolidusContract
          .connect(impersonateUser2)
          .followUser(deployer);

        const numFollowers = await testSolidusContract.getNumFollowers(
          deployer
        );
        const numFollowing = await testSolidusContract.getNumFollowing(
          user2Address
        );

        assert.equal(numFollowers, 1);
        assert.equal(numFollowing, 1);

        assert.equal(
          await testSolidusContract
            .connect(impersonateUser2)
            .isFollowing(deployer),
          true
        );

        assert.equal(
          await testSolidusContract.isFollowedBy(user2Address),
          true
        );
      });
    });
  });
})();
