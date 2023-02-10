// contracts/Solidus.sol
// SPDX-License-Identifier: MIT

import './SolidusUser.sol';

pragma solidity ^0.8.0;

contract Solidus is SolidusUser {
  address private _owner;
  
  struct Post {
    address from;
    PostContent[] content;
  }

  struct PostContent {
    string postText;
    string postImage;
  }

  constructor(){
    _owner = msg.sender;
  }

  
}