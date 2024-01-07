import express from "express"
import routes from "./routes"
import bodyParser from "body-parser"
import apiRules from "./assets/rules"

const host = process.env.HOST ?? "localhost"
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

// Rules
app.use(apiRules)

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.use("/", routes)

// Server
app.listen(port, host, () => {
	console.log(`[ ready ] http://${host}:${port}`)
})
