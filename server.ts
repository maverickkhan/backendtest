import Express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import cors from "cors"
import router from "./routes";
const app = Express()
const PORT = 8081

app.use(cors())
app.use(bodyParser.json())

app.use(`/`, router)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))