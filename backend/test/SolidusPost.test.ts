(() => {
  const { assert } = require('chai');
  const { network, ethers } = require('hardhat');
  const { describe, it } = require('mocha');

  describe('Post test suite', function () {
    let deployer, impersonateDeployer, testSolidusContract, user;

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
      await testSolidusContract.userAuth();
    });

    describe('CRUD methods', () => {
      it('should create and retrieve post', async () => {
        await testSolidusContract.createPost('post text', 'post image');

        const [post] = await testSolidusContract.getPosts(
          impersonateDeployer.address
        );

        assert.equal(post.text, 'post text');
        assert.equal(post.image, 'post image');
      });

      it('should update a post', async () => {
        await testSolidusContract.createPost('post text', 'post image');

        const [post] = await testSolidusContract.getPosts(
          impersonateDeployer.address
        );

        await testSolidusContract.updatePost(post.id, 'new text', 'new image');

        const [updatedPost] = await testSolidusContract.getPosts(
          impersonateDeployer.address
        );

        assert.equal(updatedPost.text, 'new text');
        assert.equal(updatedPost.image, 'new image');
      });
    });
  });
})();
