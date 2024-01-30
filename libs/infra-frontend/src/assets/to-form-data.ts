import { IFile, AnyObject } from "Shared"

export class ToFormData {
	static file(formData: FormData, file: IFile, name?: string) {
		formData.append(name ? name : "file", file)
	}

	static object(formData: FormData, data: AnyObject, flag?: string) {
		Object.keys(data).forEach((key) => {
			formData.append(flag ? flag + key : key, data[key])
		})
	}
}
