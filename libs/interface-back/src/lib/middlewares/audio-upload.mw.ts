import multer, { Multer } from "multer"
import { AUDIO_MIME_TYPES, ApiErrHandler, ApiNext, ApiReply, ApiRequest } from "../../assets"

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "audios")
	},
	filename: (req, file, callback) => {
		callback(null, "IMG_" + Date.now() + "." + AUDIO_MIME_TYPES[file.mimetype])
	},
})

const upload: Multer = multer({ storage: storage })

export const audioStorage = (req: ApiRequest, res: ApiReply, next: ApiNext) => {
	try {
		upload.array("files", 50)

		next()
	} catch (error) {
		ApiErrHandler.reply(error, res)
	}
}
