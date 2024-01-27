import { ErrorMsg, FileType, IMimetypes } from "../../assets"

// SONG
export class FileValidator {
	validate(file: FileType, mimetypes: IMimetypes, backend?: boolean): void {
		try {
			const check = Object.keys(mimetypes).find((mimetype) => mimetype === file.mimetype)
			if (!check)
				throw new ErrorMsg("Audiofile format  is not valid", backend ? 400 : undefined)

			return
		} catch (error) {
			throw new ErrorMsg("error during Genres format", backend ? 500 : undefined).treatError(
				error
			)
		}
	}
}
