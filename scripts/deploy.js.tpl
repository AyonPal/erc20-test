const hre = require("hardhat");

async function main() {
  const TestToken = await hre.ethers.getContractFactory("{{uid}}");
  const testToken = await TestToken.deploy("{{supply}}");

  await testToken.deployed();

  console.log(testToken.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });