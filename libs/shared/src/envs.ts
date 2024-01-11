import * as dotenv from "dotenv"

dotenv.config()

interface ProcessEnv {
	[key: string]: string
	NODE_ENV: "development" | "production" | "staging" | "testing" | "qa" // "qa" = quality assurance
	DATABASE_URL: string
	API_URL: string
}

const processEnv = process.env as ProcessEnv

export const envs = {
	nodeEnv: processEnv.NODE_ENV ?? "",
	dbUrl: processEnv.DATABASE_URL ?? "",
	apiUrl: processEnv.API_URL ?? "",
}
