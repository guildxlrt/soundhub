export class ErrorMsg extends Error {
	status: number

	constructor(status: number, message: string) {
		super(message)
		this.status = status
	}
}

// export class AppError extends Error {
// 	readonly location: string

// 	constructor(error: any, location: string) {
// 		super()
// 		this.location = `Error in ${location}`
// 		this.name = error.name
// 		this.message = error.message
// 		this.stack = error.stack
// 	}
// }
