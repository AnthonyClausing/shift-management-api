import User from './user'
import * as crypto from 'crypto'
const bcrypt = require('bcrypt')

const authenticate = async (userReq: { token: string; email: string }): Promise<boolean> => {
  const user = await User.findBy('auth_token', userReq.token)
  return user.email === userReq.email
}

const createToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'))
    })
  })
}
const hashPassword = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err: any, hash: string) => {
      err ? reject(err) : resolve(hash)
    })
  )
}

const checkPassword = async (rawPassword: string, password_digest: string): Promise<boolean> => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(rawPassword, password_digest, (err: any, response: boolean) => {
      if (err) {
        reject(err)
      } else if (response) {
        resolve(response)
      } else {
        reject(new Error('Passwords do not match'))
      }
    })
  )
}

export default { checkPassword, hashPassword, createToken, authenticate }
