import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', router)

const routes = [
  'get /cat',
  'get /cat/:id',
  'post /cat',
  'put /cat/:id',
  'delete /cat/:id'
]

// Simplificar para cada ruta no tener que crear el metodo por aparte.
router
  .route('/cat')
  .get()
  .put()
  .delete()

// Custom middleware for logging and using next for calling next middleware in the stack
const log = (req, res, next) => {
  console.log('logging')
  next()
}

// Subrouting with the route /route
router.get('/route', (req, res) => {
  res.send({ me: 'ok' })
})

app.get('/', log, (req, res) => {
  res.send({ message: 'hello' })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'Ok' })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server started in port 3000')
  })
}
