declare namespace NodeJS {
	interface ProcessEnv {
		[key: string]: string
		NODE_ENV: "development" | "production"
	}
}
