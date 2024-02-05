export {}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string
			NODE_ENV: "development" | "production"
			PRIVATE_KEY: string
		}
	}
}
