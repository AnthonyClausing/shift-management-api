import User from './user'
import * as crypto from 'crypto'
const bcrypt = require('bcrypt')

const authenticate = async (userReq) => {
  const user = await User.findBy('auth-token', userReq.token)
  return user.email === userReq.email
}

const createToken = async() => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'))
    })
  })
}
const hashPassword = async(password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  )
}

const checkPassword = async(rawPassword, user) => {
  return new Promise((resolve, reject) => 
    bcrypt.compare(rawPassword, user.password_digest, (err, response) => {
        if (err) {
          reject(err)
        }
        else if (response) {
          resolve(response)
        } else {
          reject(new Error('Passwords do not match.'))
        }
    }))
}

export default {checkPassword, hashPassword, createToken, authenticate}