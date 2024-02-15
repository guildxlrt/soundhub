import { AnyObject } from "../../types"

export class GetAnnounceShortDTO {
	readonly id: number
	readonly createdBy: number
	readonly title: string

	constructor(id: number, createdBy: number, title: string) {
		this.id = id
		this.createdBy = createdBy
		this.title = title
	}

	static createFromData(data: AnyObject): GetAnnounceShortDTO {
		return new GetAnnounceShortDTO(data?.["id"], data?.["createdBy"], data?.["title"])
	}

	static createArrayFromData(data: AnyObject[]): GetAnnounceShortDTO[] {
		return data.map((annouce): GetAnnounceShortDTO => {
			return new GetAnnounceShortDTO(
				annouce?.["id"],
				annouce?.["createdBy"],
				annouce?.["title"]
			)
		})
	}
}
