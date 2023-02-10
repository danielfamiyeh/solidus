// contracts/SolidusUser.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SolidusUser {
  mapping(address => User) users;
  mapping(string => bool) nameTaken;

  struct User {
    address addr;
    string name;
    string avatar;
  }

  function userSignUp(string calldata name, string calldata avatar) public {
    require(userNotExists(msg.sender), 'You already have an account');
    require(!nameTaken[name], 'This name has been taken');
    users[msg.sender] = User(msg.sender, name, avatar);
  }

  function userSignIn() public view returns (User memory) {
    require(!userNotExists(msg.sender), 'Please create an account first');
    return users[msg.sender];
  }

  function userUpdate(
    string calldata name,
    string calldata avatar
  ) public onlyWithAccount {
    users[msg.sender].name = name;
    users[msg.sender].avatar = avatar;
  }

  function userDelete() public onlyWithAccount {
    delete users[msg.sender];
  }

  function userNotExists(address addr) public view returns (bool) {
    return users[addr].addr == address(0);
  }

  function getUser(address user) public view returns (User memory) {
    return users[user];
  }

  modifier onlyWithAccount() {
    require(!userNotExists(msg.sender), 'Please create an account');
    _;
  }
}
