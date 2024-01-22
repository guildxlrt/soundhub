import multer, { Multer } from "multer"
import { ApiErrHandler, ApiNext, ApiReply, ApiRequest, IMG_MIME_TYPES } from "../../assets"

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images")
	},
	filename: (req, file, callback) => {
		callback(null, "IMG_" + Date.now() + "." + IMG_MIME_TYPES[file.mimetype])
	},
})

const upload: Multer = multer({ storage: storage })

export const imageStorage = (req: ApiRequest, res: ApiReply, next: ApiNext) => {
	try {
		upload.single("file")

		next()
	} catch (error) {
		ApiErrHandler.reply(error, res)
	}
}
