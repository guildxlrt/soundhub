import multer, { Multer } from "multer"
import { NextResponse, ExpressRequest, ExpressResponse, AUDIO_MIME_TYPES, filePath } from "Shared"
import { ApiErrorHandler } from "../assets"

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, filePath.origin.audio)
	},
	filename: (req, file, callback) => {
		callback(null, "AUDIO_" + Date.now() + "." + AUDIO_MIME_TYPES[file.mimetype])
	},
})

const upload: Multer = multer({ storage: storage })

export const audioStorage = async (
	req: ExpressRequest,
	res: ExpressResponse,
	next: NextResponse
) => {
	try {
		upload.array("songs", 50)

		next()
	} catch (error) {
		await ApiErrorHandler.reply(error, res)
	}
}
