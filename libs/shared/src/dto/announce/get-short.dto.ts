import { AnyObject } from "../../types"

export class GetAnnounceShortDTO {
	readonly id: number
	readonly owner_id: number
	readonly title: string

	constructor(id: number, owner_id: number, title: string) {
		this.id = id
		this.owner_id = owner_id
		this.title = title
	}

	static createFromData(data: AnyObject): GetAnnounceShortDTO {
		return new GetAnnounceShortDTO(data?.["id"], data?.["owner_id"], data?.["title"])
	}

	static createArrayFromData(data: AnyObject[]): GetAnnounceShortDTO[] {
		return data.map((annouce): GetAnnounceShortDTO => {
			return new GetAnnounceShortDTO(
				annouce?.["id"],
				annouce?.["owner_id"],
				annouce?.["title"]
			)
		})
	}
}
