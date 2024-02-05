import { Readable } from "stream"

export abstract class Stream {
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

	constructor(
		fieldname: string,
		originalname: string,
		encoding: string,
		mimetype: string,
		size: number,
		stream: Readable,
		destination: string,
		filename: string,
		path: string,
		buffer: Buffer
	) {
		this.fieldname = fieldname
		this.originalname = originalname
		this.encoding = encoding
		this.mimetype = mimetype
		this.size = size
		this.stream = stream
		this.destination = destination
		this.filename = filename
		this.path = path
		this.buffer = buffer
	}
}
