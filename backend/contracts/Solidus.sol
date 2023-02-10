// contracts/Solidus.sol
// SPDX-License-Identifier: MIT

import './SolidusPost.sol';
import './SolidusUser.sol';

pragma solidity ^0.8.0;

contract Solidus is SolidusUser, SolidusPost {
  address private _owner;
  
  constructor(){
    _owner = msg.sender;
  }

  function getPosts(address user) public view onlyWithAccount returns(Post[] memory)  {
    return _getPosts(user);
  } 
  function getPost(address user, bytes32 uuid) public view onlyWithAccount returns(Post memory post, uint index) {
    return _getPost(user, uuid);
  }
  function createPost( PostContent[] calldata postContent) public onlyWithAccount {
    _createPost(postContent);
  } 
  function updatePost(bytes32 id, PostContent[] calldata postContent) public onlyWithAccount {
    _updatePost(id, postContent);
  }
  function deletePost(bytes32 id) public onlyWithAccount {
    _deletePost(id);
  }
}