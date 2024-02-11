import { AnyObject } from "../../types"

export class PostReleaseDTO {
	readonly title: string
	readonly releaseType: string
	readonly descript: string | null
	readonly price: number | null
	readonly genres: string[]

	constructor(
		title: string,
		releaseType: string,
		descript: string | null,
		price: number | null,
		genres: string[]
	) {
		this.title = title
		this.releaseType = releaseType
		this.descript = descript
		this.price = price
		this.genres = genres
	}

	static createFromInput(release: AnyObject) {
		return new PostReleaseDTO(
			release?.["title"],
			release?.["releaseType"],
			release?.["descript"],
			release?.["price"],
			release?.["genres"]
		)
	}
}
