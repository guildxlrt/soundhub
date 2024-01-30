import multer, { Multer } from "multer"
import { ApiErrHandler } from "../utils"
import { AUDIO_MIME_TYPES, ApiNext, ApiRes, ApiRequest, filePath } from "Shared"

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, filePath.origin.audio)
	},
	filename: (req, file, callback) => {
		callback(null, "AUDIO_" + Date.now() + "." + AUDIO_MIME_TYPES[file.mimetype])
	},
})

const upload: Multer = multer({ storage: storage })

export const audioStorage = async (req: ApiRequest, res: ApiRes, next: ApiNext) => {
	try {
		upload.array("songs", 50)

		next()
	} catch (error) {
		await new ApiErrHandler().reply(error, res)
	}
}
