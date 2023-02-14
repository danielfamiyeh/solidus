import { ethers } from 'hardhat';

async function main() {
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  const Solidus = await ethers.getContractFactory('Solidus');

  console.log('Deploying Solidus...');
  const solidus = await Solidus.deploy();
  await solidus.deployed();
  console.log(`Solidus deployed to: ${solidus.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
