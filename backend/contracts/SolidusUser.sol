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
    string coverPhoto;
    string bio;
  }

  function userAuth() public returns (User memory user) {
    if (userNotExists(msg.sender)) {
      user = User(msg.sender, '', '', '', '');
      users[msg.sender] = user;
    } else {
      user = users[msg.sender];
    }
  }

  function userUpdate(
    string calldata name,
    string calldata avatar,
    string calldata coverPhoto,
    string calldata bio
  ) public onlyWithAccount {
    users[msg.sender].name = name;
    users[msg.sender].avatar = avatar;
    users[msg.sender].coverPhoto = coverPhoto;
    users[msg.sender].bio = bio;
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
