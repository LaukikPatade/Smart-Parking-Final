// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract parkingTicket {
    uint256 totalTickets;
    // event NewTicket(address indexed from, uint256 timestamp, string message);

    struct Ticket {    // in minutes
        address owner;
        uint256 duration;  
        string plateNumber;
        string zone;
        bool isActive;
        uint256 startTime;
    }
mapping(address => Ticket[]) public parkingTickets;
    
    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function buyTicket(uint256  _duration,string memory _plateNumber,string memory  _zone,address payable zoneOwner) public payable {
        totalTickets += 1;
        console.log("%s has bought",msg.sender);
        // uint256 amount=0.001 ether;
        // (bool sent,) = payable(campaign.owner).call{value:amount}("");
        // (bool success,) = payable(zoneOwner).call{value: amount}("");
        // zoneOwner.transfer(msg.value);
        (bool sent, ) = zoneOwner.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        // require(success, "Failed to send Ether");
        
        parkingTickets[msg.sender].push(Ticket(msg.sender,_duration,_plateNumber,_zone,true,block.timestamp));
    }
    function checkValidity() public {

        for (uint i = 0; i<parkingTickets[msg.sender].length ; i++) {
            Ticket memory ticket = parkingTickets[msg.sender][i];
    uint256 endTime = ticket.startTime + ticket.duration;
    if (ticket.isActive && block.timestamp >= endTime) {
        parkingTickets[msg.sender][i].isActive=false;
         // ticket has expired
    } 
        }
    }
     
   function getAllTickets() public view returns(Ticket[] memory){
        
        return parkingTickets[msg.sender];
    }
    
    function getTotalTickets() public view returns (uint256){
        console.log("We have %d total tickets",totalTickets);
        return totalTickets;
    }
}