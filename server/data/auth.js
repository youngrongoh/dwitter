let users = [
  {
    id: '1',
    username: 'bob123',
    password: 'bobbob',
    name: 'bob',
    email: 'bob123@gmail.com',
    url: 'https://widgetwhats.com/app/upload/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
