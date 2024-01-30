import { ErrorHandler, ErrorMsg } from "../../errors"
import { IFile, IMimetypes } from "../../types"

// SONG
export class FileValidator {
	validate(file: IFile, mimetypes: IMimetypes, backend?: boolean): void {
		try {
			const check = Object.keys(mimetypes).find((mimetype) => mimetype === file.mimetype)
			if (!check)
				throw new ErrorMsg("Audiofile format  is not valid", backend ? 400 : undefined)

			return
		} catch (error) {
			throw new ErrorHandler().handle(error).setMessage("error during Genres format")
		}
	}
}
