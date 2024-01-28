export interface IFile extends File {
	fieldname: string
	originalname: string
	encoding: string
	mimetype: string
	size: number
	stream: any
	destination: string
	filename: string
	path: string
	buffer: Buffer
}
export type FilesArray = IFile[]
