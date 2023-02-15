// contracts/Solidus.sol
// SPDX-License-Identifier: MIT

import './SolidusPost.sol';
import './SolidusUser.sol';

pragma solidity ^0.8.0;

contract Solidus is SolidusPost, SolidusUser {
  address private _owner;

  constructor() SolidusPost() SolidusUser() {
    _owner = msg.sender;
  }

  function getOwner() public view returns (address) {
    return _owner;
  }

  function getPost(
    bytes32 uuid
  )
    public
    view
    returns (
      bytes32,
      string memory,
      string memory,
      address,
      string memory,
      string memory,
      uint,
      uint,
      uint
    )
  {
    Post storage post = posts[uuid];
    return (
      post.id,
      post.text,
      post.image,
      post.createdBy,
      users[post.createdBy].name,
      users[post.createdBy].avatar,
      post.createdAt,
      post.updatedAt,
      post.numLikes
    );
  }

  function createPost(
    string memory text,
    string memory image
  ) public onlyWithAccount {
    return _createPost(text, image);
  }

  function updatePost(
    bytes32 uuid,
    string memory text,
    string memory image
  ) public onlyWithAccount {
    _updatePost(uuid, text, image);
  }
}
