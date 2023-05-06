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

    Ticket[] tickets;
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
        (bool sent, bytes memory data) = zoneOwner.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        // require(success, "Failed to send Ether");
        tickets.push(Ticket(msg.sender,_duration,_plateNumber,_zone,true,block.timestamp));
    }
    function getAllTickets() public view returns(Ticket[] memory){
        return tickets;
    }
    function getTotalTickets() public view returns (uint256){
        console.log("We have %d total tickets",totalTickets);
        return totalTickets;
    }
}