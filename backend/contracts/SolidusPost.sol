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

    return userPosts;
  }

  function _getPost(
    address user,
    bytes32 uuid
  ) internal view returns (Post memory) {
    return posts[user][uuid];
  }

  function _createPost(string memory text, string memory image) internal {
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

  function _updatePost(
    bytes32 uuid,
    string memory text,
    string memory image
  ) internal {
    require(posts[msg.sender][uuid].id == uuid, 'Post does not exist');

    Post storage post = posts[msg.sender][uuid];
    post.text = text;
    post.image = image;
    post.updatedAt = block.timestamp;
  }
}
