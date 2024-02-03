import multer, { Multer } from "multer"
import { NextResponse, ExpressRequest, ExpressResponse, IMAGE_MIME_TYPES, filePath } from "Shared"
import { ApiErrorHandler } from "../assets"

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, filePath.origin.image)
	},
	filename: (req, file, callback) => {
		callback(null, "IMG_" + Date.now() + "." + IMAGE_MIME_TYPES[file.mimetype])
	},
})

const upload: Multer = multer({ storage: storage })

export const imageStorage = async (
	req: ExpressRequest,
	res: ExpressResponse,
	next: NextResponse
) => {
	try {
		upload.single("image")

		next()
	} catch (error) {
		await new ApiErrorHandler().reply(error, res)
	}
}
