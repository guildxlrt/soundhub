import { GenresArray, AnyObject } from "../../types"

export class ArtistShortestDTO {
	readonly id: number | null
	readonly name: string
	readonly genres: GenresArray

	constructor(id: number | null, name: string, genres: GenresArray) {
		this.id = id
		this.name = name
		this.genres = genres
	}

	static createFromData(data: AnyObject): ArtistShortestDTO {
		return new ArtistShortestDTO(data?.["id"], data?.["name"], data?.["genres"])
	}

	static createArrayFromData(data: AnyObject[]): ArtistShortestDTO[] {
		return data.map((artist): ArtistShortestDTO => {
			return new ArtistShortestDTO(artist?.["id"], artist?.["name"], artist?.["genres"])
		})
	}
}
