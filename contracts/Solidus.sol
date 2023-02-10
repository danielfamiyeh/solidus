// contracts/Solidus.sol

// SPDX-Licence-Identififer: MIT


contract Solidus {
  address private _owner;
  mapping (address => User) users;

  struct User {
    string username;
    address addr;
  }

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

  // USER METHODS
  function userSignUp(string calldata username ) public {
    require(userNotExists(msg.sender), 'You already have an account');
    users[msg.sender] = User(username, msg.sender);
  }

  function userSignIn() public view returns(User memory) {
    require(!userNotExists(msg.sender), 'Please create an account first');
    return users[msg.sender];
  }

  function userNotExists(address addr) public view returns(bool){
    return users[addr].addr == address(0);
  }
  
}