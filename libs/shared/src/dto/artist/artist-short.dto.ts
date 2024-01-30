import { GenresArray, AnyObject } from "../../types"

export class ArtistShortDTO {
	readonly id: number | null
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly avatarPath: string | null

	constructor(
		id: number | null,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		avatarPath: string | null
	) {
		this.id = id
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.avatarPath = avatarPath
	}

	static createFromData(data: AnyObject) {
		return new ArtistShortDTO(
			data?.["id"],
			data?.["name"],
			data?.["bio"],
			data?.["members"],
			data?.["genres"],
			data?.["avatarPath"]
		)
	}
}
