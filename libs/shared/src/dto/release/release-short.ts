import { AnyObject } from "../../types"

export class ReleaseShortDTO {
	readonly id: number
	readonly owner_id: number
	readonly title: string
	readonly releaseType: string
	readonly genres: string[]

	constructor(
		id: number,
		owner_id: number,
		title: string,
		releaseType: string,
		genres: string[]
	) {
		this.id = id
		this.owner_id = owner_id
		this.title = title
		this.releaseType = releaseType
		this.genres = genres
	}

	static createFromData(data: AnyObject): ReleaseShortDTO {
		return new ReleaseShortDTO(
			data?.["id"],
			data?.["title"],
			data?.["owner_id"],
			data?.["releaseType"],
			data?.["genres"]
		)
	}

	static createArrayFromData(data: AnyObject[]): ReleaseShortDTO[] {
		return data.map((release): ReleaseShortDTO => {
			return new ReleaseShortDTO(
				release?.["id"],
				release?.["title"],
				release?.["owner_id"],
				release?.["releaseType"],
				release?.["genres"]
			)
		})
	}
}
