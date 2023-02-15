// contracts/SolidusPost.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SolidusPost {
  uint internal constant NUM_RECENT_POSTS = 10;

  mapping(bytes32 => Post) internal posts;
  mapping(address => bytes32[]) internal postIds;
  mapping(bytes32 => PostComment[]) internal postComments;
  mapping(address => mapping(bytes32 => bool)) internal isPostLikedByUser;

  event CreatePost(
    address indexed user,
    bytes32 indexed postId,
    uint createdAt
  );
  event UpdatePost(
    address indexed user,
    bytes32 indexed postId,
    uint updatedAt
  );
  event LikePost(address indexed user, bytes32 indexed postId, uint createdAt);
  event UnlikePost(address indexed user, bytes32, uint createdAt);

  struct Post {
    bytes32 id;
    string text;
    string image;
    address createdBy;
    uint createdAt;
    uint updatedAt;
    uint numLikes;
  }

  struct PostComment {
    bytes32 id;
    string text;
    bytes32 postId;
    uint createdAt;
    address createdBy;
  }

  function getPosts(address user) public view returns (Post[] memory) {
    bytes32[] memory _postIds = postIds[user];
    Post[] memory userPosts = new Post[](_postIds.length);

    for (uint i = 0; i < _postIds.length; i++) {
      userPosts[i] = posts[_postIds[i]];
    }

    return userPosts;
  }

  function getPostIds(address user) public view returns (bytes32[] memory) {
    return postIds[user];
  }

  /** ==== MUTATIONS ==== */
  function _createPost(string memory text, string memory image) internal {
    bytes32 uuid = keccak256(abi.encodePacked(block.timestamp, msg.sender));
    Post storage post = posts[uuid];
    post.id = uuid;
    post.text = text;
    post.image = image;
    post.createdBy = msg.sender;
    post.createdAt = block.timestamp;
    post.updatedAt = 0;
    post.numLikes;

    postIds[msg.sender].push(uuid);

    emit CreatePost(msg.sender, uuid, block.timestamp);
  }

  function _updatePost(
    bytes32 uuid,
    string memory text,
    string memory image
  ) internal {
    require(posts[uuid].id == uuid, 'Post does not exist');

    Post storage post = posts[uuid];
    post.text = text;
    post.image = image;
    post.updatedAt = block.timestamp;

    emit UpdatePost(msg.sender, uuid, block.timestamp);
  }

  function _likePost(bytes32 uuid) internal {
    require(posts[uuid].id == uuid, 'Post does not exist');
    if (isPostLikedByUser[msg.sender][uuid]) {
      posts[uuid].numLikes--;
      isPostLikedByUser[msg.sender][uuid] = false;
      emit UnlikePost(msg.sender, uuid, block.timestamp);
    } else {
      posts[uuid].numLikes++;
      isPostLikedByUser[msg.sender][uuid] = true;
      emit LikePost(msg.sender, uuid, block.timestamp);
    }
  }
}
