import { AnyObject } from "../../types"

export class GetAnnounceShortDTO {
	readonly id: number
	readonly publisher_id: number
	readonly title: string

	constructor(id: number, publisher_id: number, title: string) {
		this.id = id
		this.publisher_id = publisher_id
		this.title = title
	}

	static createFromData(data: AnyObject): GetAnnounceShortDTO {
		return new GetAnnounceShortDTO(data?.["id"], data?.["publisher_id"], data?.["title"])
	}

	static createArrayFromData(data: AnyObject[]): GetAnnounceShortDTO[] {
		return data.map((annouce): GetAnnounceShortDTO => {
			return new GetAnnounceShortDTO(
				annouce?.["id"],
				annouce?.["publisher_id"],
				annouce?.["title"]
			)
		})
	}
}
