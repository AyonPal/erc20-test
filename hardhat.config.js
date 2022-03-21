require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    mumbai:{
      url: 'https://polygon-mumbai.g.alchemy.com/v2/a_wo4RxClKQTZZhOowUWEkvpCpWGiqug',
      accounts: ["0xaa662c423a7027a57b5b3b57f468cba3184013b093c8365b062e35ba4cc6589d"]
    }
  }
};
