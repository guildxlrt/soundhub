import multer, { Multer } from "multer"
import { ApiErrHandler } from "../utils"
import { IMAGE_MIME_TYPES, ApiNext, ApiRes, ApiRequest, filePath } from "Shared"

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, filePath.origin.image)
	},
	filename: (req, file, callback) => {
		callback(null, "IMG_" + Date.now() + "." + IMAGE_MIME_TYPES[file.mimetype])
	},
})

const upload: Multer = multer({ storage: storage })

export const imageStorage = async (req: ApiRequest, res: ApiRes, next: ApiNext) => {
	try {
		upload.single("image")

		next()
	} catch (error) {
		await new ApiErrHandler().reply(error, res)
	}
}
