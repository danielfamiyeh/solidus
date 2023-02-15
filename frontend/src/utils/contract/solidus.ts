import {
  useContract,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi';

export type Address = `0x${string}`;

export const solidusAbi = [
  'function getOwner() public view returns (address)',
  // SolidusUser
  'function userAuth() public returns (User user)',
  'function userUpdate(string calldata name,string calldata avatar,string calldata coverPhoto,string calldata bio) public',
  'function userDelete() public',
  'function unfollowUser(address addr) public',
  'function userNotExists(address addr) public view returns (bool)',
  'function getNumFollowers(address user) public view returns (uint)',
  'function getNumFollowing(address user) public view returns (uint)',
  'function getFollowerList(address user) public view returns (address[])',
  'function getFollowingList(address user) public view returns (address[])',
  'function isFollowing(address user) public view returns (bool)',
  'function isFollowedBy(address user) public view returns (bool)',
  'function getUser(address user) public view returns (User)',
  'function getIsFollowedBy(address user1,address user2) public view returns (bool)',
  // SolidusPost
  'function getPosts(address user) public view returns (Post[])',
  'function getPost(bytes32 uuid) public view returns (Post)',
  'function createPost(string text,string image) public',
  'function updatePost(bytes32 uuid, string text, string image) public',
];
