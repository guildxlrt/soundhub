import { AnyObject } from "Shared"

export class NewFormData {
	static fromFile(formData: FormData, file: Blob, name?: string) {
		formData.append(name ? name : "file", file as Blob)
	}

	static fromObject(formData: FormData, data: AnyObject, flag?: string) {
		Object.keys(data).forEach((key) => {
			formData.append(flag ? flag + key : key, data[key])
		})
	}
}
