import { AnyObject } from "../../types"

export class AnnounceShortDTO {
	readonly id: number
	readonly owner_id: number
	readonly title: string

	constructor(id: number, owner_id: number, title: string) {
		this.id = id
		this.owner_id = owner_id
		this.title = title
	}

	static createFromData(data: AnyObject): AnnounceShortDTO {
		return new AnnounceShortDTO(data?.["id"], data?.["owner_id"], data?.["title"])
	}

	static createArrayFromData(data: AnyObject[]): AnnounceShortDTO[] {
		return data.map((annouce): AnnounceShortDTO => {
			return new AnnounceShortDTO(annouce?.["id"], annouce?.["owner_id"], annouce?.["title"])
		})
	}
}
