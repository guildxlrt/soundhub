import { AnyObject } from "../../types"

export class CreateAnnounceDTO {
	readonly title: string
	readonly text: string

	constructor(title: string, text: string) {
		this.title = title
		this.text = text
	}

	static createFromInput(data: AnyObject) {
		return new CreateAnnounceDTO(data?.["title"], data?.["text"])
	}
}
