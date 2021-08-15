import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Omar',
    email: 'omar@example.com',
    password: bcrypt.hashSync('123456', 10),
  },    
  {
    name: 'Imtiaz',
    email: 'imtiaz@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users