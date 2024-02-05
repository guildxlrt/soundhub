import {
	ErrorHandler,
	ErrorMsg,
	htmlError,
	AUDIO_MIME_TYPES,
	IMAGE_MIME_TYPES,
	Stream,
} from "Shared"

export class FileValidator {
	validate(file: Stream, type: "audio" | "image"): void {
		try {
			if (!file) return
			if (type === "audio") {
				const check = Object.keys(AUDIO_MIME_TYPES).find(
					(mimetype) => mimetype === file?.["mimetype"]
				)
				if (!check) throw new ErrorMsg(`${type} file is not valid`, htmlError[422].value)
			}
			if (type === "image") {
				const check = Object.keys(IMAGE_MIME_TYPES).find(
					(mimetype) => mimetype === file?.["mimetype"]
				)
				if (!check) throw new ErrorMsg(`${type} file is not valid`, htmlError[422].value)
			} else throw new ErrorMsg(`${type} file is not valid`, htmlError[422].value)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error during file validation")
		}
	}
}
