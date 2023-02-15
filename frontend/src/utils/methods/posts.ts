const fields = [
  'id',
  'text',
  'image',
  'createdBy',
  'createdByName',
  'createdByAvatar',
  'createdAt',
  'updatedAt',
];

export const getPostsFromIds = async (contract, postIds) =>
  await Promise.all(
    (postIds ?? []).map(async (postId) => {
      const postValues = await contract?.getPost(postId);

      return Object.assign(
        {},
        ...fields.map((field, i) => ({
          [field]: postValues[i]?.toString(),
        }))
      );
    })
  );
