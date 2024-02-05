import { Readable } from "stream"

interface UserToken {
	id: number
	profileID: number
	profileType?: "artist" | "fan" | "admin"
}

interface Stream {
	fieldname: string
	originalname: string
	encoding: string
	mimetype: string
	size: number
	stream: Readable
	destination: string
	filename: string
	path: string
	buffer: Buffer
}

declare namespace Express {
	interface Request {
		auth?: UserToken
		image?: Stream
		songs?: Stream[]
	}
}
