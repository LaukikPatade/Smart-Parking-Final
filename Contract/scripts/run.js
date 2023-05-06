const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const parkingContractFactory = await hre.ethers.getContractFactory("parkingTicket");
    const parkingContract = await parkingContractFactory.deploy();
    await parkingContract.deployed();

    console.log("Contract deployed to:", parkingContract.address);
    console.log("Contract deployed by:", owner.address);

    await parkingContract.getTotalTickets();

    const parkTxn=await parkingContract.buyTicket(2,"MH2002","Parking Zone A","0x5a9C2547088D1F82e17B56B4f2dCdE86856ECe64", { value: ethers.utils.parseEther("1")});
    await parkTxn.wait();

    await parkingContract.getTotalTickets()

    const secondParkTxn = await parkingContract.connect(randomPerson).buyTicket(3,"MH2012","Parking Zone B","0x5a9C2547088D1F82e17B56B4f2dCdE86856ECe64", { value: ethers.utils.parseEther("1")});
    await secondParkTxn.wait();

    await parkingContract.getTotalTickets();

    let allTickets=await parkingContract.getAllTickets();
    console.log(allTickets)

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();