import { Users } from '../db/database.js';

export async function findByUsername(username) {
  return await Users.findOne({
    where: {
      username,
    },
  });
}

export async function findById(id) {
  return await Users.findOne({
    where: {
      id,
    },
  });
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  return await Users.create({ username, password, name, email, url }).id;
}
