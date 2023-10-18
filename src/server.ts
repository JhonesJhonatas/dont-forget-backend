import 'reflect-metadata'
import './shared/container'
import express from 'express'
import { routes } from './routes'

const app = express()
const port = 3333

app.use(express.json())

app.use(routes)

app.listen(port, () => {
  console.log(`Server running on port: ${port}. 🚀🚀`)
})
