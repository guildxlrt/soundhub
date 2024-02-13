import { AnyObject } from "../../types"

export class GetAnnounceDTO {
	readonly id: number
	readonly publisher_id: number
	readonly title: string
	readonly text: string
	readonly imagePath: string | null

	constructor(
		id: number,
		publisher_id: number,
		title: string,
		text: string,
		imagePath: string | null
	) {
		this.id = id
		this.publisher_id = publisher_id
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}

	static createFromData(data: AnyObject) {
		return new GetAnnounceDTO(
			data?.["id"],
			data?.["publisher_id"],
			data?.["title"],
			data?.["text"],
			data?.["imagePath"]
		)
	}
}
