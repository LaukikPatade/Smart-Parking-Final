require("@nomicfoundation/hardhat-toolbox");

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
    solidity: "0.8.17",
    networks: {
        sepolia: {
            url: "https://old-hidden-shape.ethereum-sepolia.discover.quiknode.pro/634493241ecb6153b1d8680016187b3649d25e06/",
            accounts: ["db22d983db856aa8c7ebeb0cb5d517342dd45d68d91e8a8cbc1d424c8fbbbddc"],
          },
      },
};