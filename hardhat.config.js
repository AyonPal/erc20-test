require("@nomiclabs/hardhat-waffle");
require("dotenv").config()
module.exports = {
  solidity: "0.8.4",
  networks:{
    mumbai:{
      url: process.env.ALCH_URI,
      accounts: [process.env.ALCH_ADDRESS]
    }
  }
};
