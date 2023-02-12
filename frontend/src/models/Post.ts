interface PostModel {
  id: string;
  text?: string;
  image?: string;
  createdBy: string;
  createdAt: number;
  updatedAt?: number;
}

export default PostModel;
