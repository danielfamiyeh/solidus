// contracts/Solidus.sol
// SPDX-License-Identifier: MIT

import './SolidusPost.sol';
import './SolidusUser.sol';

pragma solidity ^0.8.0;

contract Solidus is SolidusUser, SolidusPost {
  address private _owner;

  constructor() {
    _owner = msg.sender;
  }

  function getPosts(
    address user
  ) public view onlyWithAccount returns (Post[] memory) {
    return _getPosts(user);
  }

  function getPost(
    address user,
    bytes32 uuid
  ) public view onlyWithAccount returns (Post memory) {
    return _getPost(user, uuid);
  }

  function createPost(
    string memory text,
    string memory image
  ) public onlyWithAccount {
    _createPost(text, image);
  }

  function updatePost(
    bytes32 uuid,
    string memory text,
    string memory image
  ) public onlyWithAccount {
    _updatePost(uuid, text, image);
  }
}
