import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  var ids = user.id
  if (!ids) {
    ids = user._id
  }
  return jwt.sign({ id: ids }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Needs email and password' })
  }
  try {
    var user = await User.create(req.body)
    var token = newToken(user)
    return res.status(201).send({ token: token })
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const signin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Needs email and password' })
    }
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .exec()

    if (!user) {
      return res.status(401).send({ message: 'Invalid user or password' })
    }

    var checkPassword = await user.checkPassword(req.body.password)


    if (!checkPassword) {
      return res.status(401).send({ message: 'Invalid user or password' })
    }
    const token = newToken(user)


    return res.status(201).send({ token })
  } catch (error) {
    return res.status(401).send({ message: 'Error' })
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (error) {
    return res.status(401).end()
  }
  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()
  if (!user) {
    return res.status(401).end()
  }
  req.user = user
  next()
}
