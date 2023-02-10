// contracts/SolidusPost.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SolidusPost {
  mapping(address => bytes32[]) postIds;
  mapping(address => mapping(bytes32 => Post)) posts;

  struct Post {
    bytes32 id;
    string text;
    string image;
    address createdBy;
    uint createdAt;
    uint updatedAt;
  }

  function _getPosts(address user) internal view returns (Post[] memory) {
    bytes32[] memory _postIds = postIds[user];
    Post[] memory userPosts = new Post[](_postIds.length);

    for (uint i = 0; i < _postIds.length; i++) {
      userPosts[i] = posts[user][_postIds[i]];
    }
  }

  function _createPost(string memory text, string memory image) public {
    bytes32 uuid = keccak256(abi.encodePacked(block.timestamp, msg.sender));
    Post storage post = posts[msg.sender][uuid];
    post.id = uuid;
    post.text = text;
    post.image = image;
    post.createdBy = msg.sender;
    post.createdAt = block.timestamp;
    post.updatedAt = 0;

    postIds[msg.sender].push(uuid);
  }
}
