// contracts/lib/LibUser.sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SolidusUser {
  mapping(address => User) users;
  mapping(string => bool) usernameTaken;

  struct User {
    address addr;
    string username;
    string avatar;
  }

  function userSignUp(string calldata username, string calldata avatar) public {
    require(userNotExists(msg.sender), 'You already have an account');
    require(!usernameTaken[username], 'This username has been taken');
    users[msg.sender] = User(msg.sender, username, avatar);
  }

  function userSignIn() public view returns (User memory) {
    require(!userNotExists(msg.sender), 'Please create an account first');
    return users[msg.sender];
  }

  function userUpdate(
    string calldata username,
    string calldata avatar
  ) public onlyWithAccount {
    users[msg.sender].username = username;
    users[msg.sender].avatar = avatar;
  }

  function userDelete() public onlyWithAccount {
    delete users[msg.sender];
  }

  function userNotExists(address addr) public view returns (bool) {
    return users[addr].addr == address(0);
  }

  modifier onlyWithAccount() {
    require(!userNotExists(msg.sender), 'Please create an account');
    _;
  }
}
