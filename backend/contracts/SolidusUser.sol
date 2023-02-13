// contracts/SolidusUser.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SolidusUser {
  mapping(address => User) private _users;
  mapping(address => address[]) private _followerLists;
  mapping(address => address[]) private _followingLists;
  mapping(address => mapping(address => bool)) private _isFollowedBy;

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
      _users[msg.sender] = user;
    } else {
      user = _users[msg.sender];
    }
  }

  function userUpdate(
    string calldata name,
    string calldata avatar,
    string calldata coverPhoto,
    string calldata bio
  ) public onlyWithAccount {
    _users[msg.sender].name = name;
    _users[msg.sender].avatar = avatar;
    _users[msg.sender].coverPhoto = coverPhoto;
    _users[msg.sender].bio = bio;
  }

  function userDelete() public onlyWithAccount {
    delete _users[msg.sender];
  }

  function followUser(address addr) public onlyWithAccount {
    require(
      !_isFollowedBy[addr][msg.sender],
      'You already follow this account'
    );
    require(addr != msg.sender, 'You cannot follow yourself');
    require(!userNotExists(addr), 'No user with that address exists');

    _isFollowedBy[addr][msg.sender] = true;
    _followingLists[msg.sender].push(addr);
    _followerLists[addr].push(msg.sender);
  }

  function unfollowUser(address addr) public onlyWithAccount {
    require(!userNotExists(addr), 'No user with that address exists');
    require(_isFollowedBy[addr][msg.sender], 'You do not follow this account');

    bool foundInFollower = false;
    bool foundInFollowing = false;

    uint numFollowers = _followerLists[addr].length;
    uint numFollowing = _followingLists[msg.sender].length;

    address[] memory auxFollowerList = new address[](numFollowers - 1);
    address[] memory auxFollowingList = new address[](numFollowing - 1);

    for (uint i = 0; i < numFollowers; i++) {
      if (_followerLists[addr][i] == msg.sender) {
        foundInFollower = true;
      } else {
        auxFollowerList[foundInFollower ? i - 1 : i] = _followerLists[addr][i];
      }
    }

    for (uint i = 0; i < numFollowing; i++) {
      if (_followingLists[msg.sender][i] == addr) {
        foundInFollowing = true;
      } else {
        auxFollowingList[foundInFollowing ? i - 1 : i] = _followingLists[addr][
          i
        ];
      }
    }

    _followerLists[addr] = auxFollowerList;
    _followingLists[msg.sender] = auxFollowingList;

    _isFollowedBy[addr][msg.sender] = false;
  }

  /** ==== UTILITY ==== */
  function userNotExists(address addr) public view returns (bool) {
    return _users[addr].addr == address(0);
  }

  /** ==== GETTERS ==== */
  function getNumFollowers(
    address user
  ) public view onlyWithAccount returns (uint) {
    require(!userNotExists(user), "User doesn't exist");
    return _followerLists[msg.sender].length;
  }

  function getNumFollowing(
    address user
  ) public view onlyWithAccount returns (uint) {
    require(!userNotExists(user), "User doesn't exist");
    return _followerLists[msg.sender].length;
  }

  function getFollowerList(
    address user
  ) public view returns (address[] memory) {
    require(!userNotExists(user), "User doesn't exist");
    return _followerLists[user];
  }

  function getFollowingList(
    address user
  ) public view returns (address[] memory) {
    require(!userNotExists(user), "User doesn't exist");
    return _followingLists[user];
  }

  function isFollowing(
    address user
  ) public view onlyWithAccount returns (bool) {
    return _isFollowedBy[user][msg.sender];
  }

  function isFollowedBy(
    address user
  ) public view onlyWithAccount returns (bool) {
    return _isFollowedBy[msg.sender][user];
  }

  function getUser(address user) public view returns (User memory) {
    return _users[user];
  }

  function getIsFollowedBy(
    address user1,
    address user2
  ) public view returns (bool) {
    require(!userNotExists(user1), "User 1 doesn't exist");
    require(!userNotExists(user2), "User 2 doesn't exist");
    return _isFollowedBy[user1][user2];
  }

  /** ==== MODIFIERS ==== */
  modifier onlyWithAccount() {
    require(!userNotExists(msg.sender), 'Please create an account');
    _;
  }
}
