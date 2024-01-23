import { FileType, IAnyObject } from "Shared"

export class ToFormData {
	static file(formData: FormData, file: FileType, name?: string) {
		formData.append(name ? name : "file", file)
	}

	static object(formData: FormData, data: IAnyObject, flag?: string) {
		Object.keys(data).forEach((key) => {
			formData.append(flag ? flag + key : key, data[key])
		})
	}
}