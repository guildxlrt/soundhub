import multer, { Multer } from "multer"
import { ApiErrHandler, ApiNext, ApiReply, ApiRequest } from "../utils"
import { IMAGE_MIME_TYPES } from "Shared"

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "tmp/images")
	},
	filename: (req, file, callback) => {
		callback(null, "IMG_" + Date.now() + "." + IMAGE_MIME_TYPES[file.mimetype])
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
