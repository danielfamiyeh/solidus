import PostModel from '@/models/Post';
import { faker } from '@faker-js/faker';

import { user1 } from './User';

export const post1: PostModel = {
  id: faker.datatype.uuid(),
  text: faker.lorem.lines(4),
  image: faker.image.abstract(),
  createdByName: user1.name,
  createdByAddress: user1.addr,
  createdByAvatar: user1.avatar,
  createdAt: Date.now() - 3600,
};
