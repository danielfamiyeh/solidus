export type Address = `0x${string}`;

export const solidusAbi = [
  'function getOwner() public view returns (address)',
  // SolidusUser
  'function userUpdate(string name, string avatar, string coverPhoto, string bio) public',
  'function userDelete() public',
  'function followUser(address addr) public',
  'function unfollowUser(address addr) public',
  'function userNotExists(address addr) public view returns (bool)',
  'function getUserAddress(address user) public view returns(string)',
  'function getNumFollowers(address user) public view returns (uint)',
  'function getNumFollowing(address user) public view returns (uint)',
  'function getFollowerList(address user) public view returns (address[])',
  'function getFollowingList(address user) public view returns (address[])',
  'function isFollowing(address user) public view returns (bool)',
  'function isFollowedBy(address user) public view returns (bool)',
  'function getUser(address user) public view returns (address, string, string, string, string)',
  'function getUserName(address user) public view returns (string)',
  'function getUserAvatar(address user) public view returns (string)',
  'function getUserBio(address user) public view returns (string)',
  'function getIsFollowedBy(address user1, address user2) public view returns (bool)',
  // SolidusPost
  'function getPosts(address user) public view returns (Post[])',
  'function getPost(bytes32 uuid) public view returns (bytes32, string, string, address, string, string uint, uint, uint)',
  'function createPost(string text,string image) public',
  'function updatePost(bytes32 uuid, string text, string image) public',
  'function getPostIds(address user) public view returns (bytes32[])',
];
