import { GenresArray, AnyObject } from "../../types"

export class GetArtistShortDTO {
	readonly id: number | null
	readonly name: string
	readonly genres: GenresArray

	constructor(id: number | null, name: string, genres: GenresArray) {
		this.id = id
		this.name = name
		this.genres = genres
	}

	static createFromData(data: AnyObject): GetArtistShortDTO {
		return new GetArtistShortDTO(data?.["id"], data?.["name"], data?.["genres"])
	}

	static createArrayFromData(data: AnyObject[]): GetArtistShortDTO[] {
		return data.map((artist): GetArtistShortDTO => {
			return new GetArtistShortDTO(artist?.["id"], artist?.["name"], artist?.["genres"])
		})
	}
}
