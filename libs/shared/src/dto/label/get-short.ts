import { AnyObject } from "../../types"

export class GetShortLabelDTO {
	readonly id: number

	readonly title: string
	readonly labelType: string
	readonly genres: string[]

	constructor(id: number, title: string, labelType: string, genres: string[]) {
		this.id = id
		this.title = title
		this.labelType = labelType
		this.genres = genres
	}

	static createFromData(data: AnyObject): GetShortLabelDTO {
		return new GetShortLabelDTO(
			data?.["id"],
			data?.["title"],
			data?.["labelType"],
			data?.["genres"]
		)
	}

	static createArrayFromData(data: AnyObject[]): GetShortLabelDTO[] {
		return data.map((label): GetShortLabelDTO => {
			return new GetShortLabelDTO(
				label?.["id"],
				label?.["title"],
				label?.["labelType"],
				label?.["genres"]
			)
		})
	}
}
