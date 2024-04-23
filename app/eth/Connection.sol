// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.4.0 <0.9.0;

contract Connect {

    struct userIdentity{
        address ethaddress;
        string suiaddress;
        string communityname;
    }

    modifier onlyOwner {
      require(msg.sender == owner);
      _;
    }

    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    mapping (address => userIdentity) identities;

    function getSui(address ethaddress) public view returns (string memory) {
        return (identities[ethaddress].suiaddress);
    }

    function getCommunity(address ethaddress) public view returns (string memory){
        return (identities[ethaddress].communityname);
    }

    function addConsumer(string memory communityname,string memory suiaddress) public {
        identities[msg.sender] = userIdentity(msg.sender, suiaddress, communityname);
    }
    
}