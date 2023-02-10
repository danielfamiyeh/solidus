// contracts/SolidusPost.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SolidusPost {
  mapping (address => Post[]) posts;

  struct Post {
    bytes32 id;
    PostContent[] content;
    address createdBy;
    uint createdAt;
    uint updatedAt;
  }

  struct PostContent {
    string contentType;
    string contentValue;
  }

  function _getPosts(address user) internal view returns(Post[] memory){
    Post[] memory userPosts = posts[user];
    return userPosts;
  }

  function _getPost(address user, bytes32 uuid) internal view returns(Post memory post, uint index) {
    Post[] memory _posts = posts[user];

    for(uint i=0; i<_posts.length; i++) {
      if(_posts[i].id == uuid) {
        post = _posts[i];
        index=i;
      }
    }
  }

  function _createPost( PostContent[] calldata postContent) internal {
    bytes32 uuid = keccak256(abi.encodePacked(block.timestamp, msg.sender));
    posts[msg.sender].push(Post(uuid, postContent, msg.sender, block.timestamp, 0));
  }

  function _updatePost(bytes32 id, PostContent[] calldata postContent) internal {
    (Post memory post, uint index) = _getPost(msg.sender, id);
    require(post.createdBy == address(msg.sender), 'Post does not exist');

    posts[msg.sender][index].content = postContent;
    posts[msg.sender][index].updatedAt = block.timestamp;
  }

  function _deletePost(bytes32 id) internal {
    (Post memory post, uint index) = _getPost(msg.sender, id);
    require(post.createdBy == address(msg.sender), 'Post does not exist');

    delete posts[msg.sender][index];
  }
}