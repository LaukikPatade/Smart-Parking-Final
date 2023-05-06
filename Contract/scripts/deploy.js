const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const parkingContractFactory = await hre.ethers.getContractFactory("parkingTicket");
    const parkingContract = await parkingContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1"),});
    await parkingContract.deployed();
  
    console.log("Contract address: ", parkingContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();