import { faker } from '@faker-js/faker';

import PostModel from '@/models/Post';
import { user1 } from './User';

export const post1: PostModel = {
  id: faker.datatype.uuid(),
  createdBy: user1.addr,
  createdAt: Date.now() - 3600,
  text: faker.lorem.lines(4),
  image: faker.image.abstract(),
};
