interface PostModel {
  id: string;
  text?: string;
  image?: string;
  createdAt: number;
  updatedAt?: number;
  createdByName: string;
  createdByAvatar: string;
  createdByAddress: string;
}

export default PostModel;
