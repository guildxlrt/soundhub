import { AnyObject } from "../../types"

export class EditAnnounceDTO {
	readonly id: number
	readonly title: string
	readonly text: string
	readonly delImage?: boolean

	constructor(id: number, title: string, text: string, delImage?: boolean) {
		this.id = id
		this.title = title
		this.text = text
		this.delImage = delImage
	}

	static createFromInput(data: AnyObject) {
		return new EditAnnounceDTO(data?.["id"], data?.["title"], data?.["text"])
	}
}
