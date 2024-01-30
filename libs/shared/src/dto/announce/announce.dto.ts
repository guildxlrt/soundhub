import { AnyObject } from "../../types"

export class AnnounceDTO {
	readonly id: number
	readonly owner_id: number
	readonly title: string
	readonly text: string
	readonly imagePath: string | null

	constructor(
		id: number,
		owner_id: number,
		title: string,
		text: string,
		imagePath: string | null
	) {
		this.id = id
		this.owner_id = owner_id
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}

	static createFromData(data: AnyObject) {
		return new AnnounceDTO(
			data?.["id"],
			data?.["owner_id"],
			data?.["title"],
			data?.["text"],
			data?.["imagePath"]
		)
	}
}
