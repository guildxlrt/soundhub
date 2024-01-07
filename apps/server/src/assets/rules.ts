import express from "express"
import cors from "cors"

const app = express()

const apiRules = app.use(
	// edit the cors
	cors()
)

export default apiRules
