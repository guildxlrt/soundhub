import { GenresArray, AnyObject } from "../../types"

export class ArtistDTO {
	readonly id: number | null
	readonly createdAt: Date
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly avatarPath: string | null

	constructor(
		id: number | null,
		createdAt: Date,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		avatarPath: string | null
	) {
		this.id = id
		this.createdAt = createdAt
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.avatarPath = avatarPath
	}

	static createFromData(data: AnyObject) {
		return new ArtistDTO(
			data?.["id"],
			data?.["createdAt"],
			data?.["name"],
			data?.["bio"],
			data?.["members"],
			data?.["genres"],
			data?.["avatarPath"]
		)
	}
}
