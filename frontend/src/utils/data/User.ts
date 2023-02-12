import { faker } from '@faker-js/faker';
import UserModel from '@/models/User';

export const user1: UserModel = {
  addr: '0xc0ffee254729296a45a3885639AC7E10F9d54979',
  name: faker.name.fullName(),
  avatar: faker.image.avatar(),
};

export const user2: UserModel = {
  addr: '0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E',
  name: faker.name.fullName(),
  avatar: faker.image.avatar(),
};
