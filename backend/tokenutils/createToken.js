import jwt from 'jsonwebtoken'

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_KEY, {
    expiresIn: '1d'
  })
}

export default createToken