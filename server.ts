import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes'
import config from './config.json'
const app = Express()

app.use(cors())
app.use(bodyParser.json())

app.use(`/`, router)

app.listen(config.PORT, () =>
  console.log(`Server started on port ${config.PORT}`)
)
