import { AnyObject } from "../../types"

export class GetAnnounceDTO {
	readonly id: number
	readonly createdBy: number
	readonly title: string
	readonly text: string
	readonly imagePath: string | null

	constructor(
		id: number,
		createdBy: number,
		title: string,
		text: string,
		imagePath: string | null
	) {
		this.id = id
		this.createdBy = createdBy
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}

	static createFromData(data: AnyObject) {
		return new GetAnnounceDTO(
			data?.["id"],
			data?.["createdBy"],
			data?.["title"],
			data?.["text"],
			data?.["imagePath"]
		)
	}
}
