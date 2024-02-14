import { GenresArray, AnyObject } from "../../types"

export class GetArtistDTO {
	readonly id: number | null
	readonly createdAt: Date
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly logoPath: string | null
	readonly isPublic: boolean

	constructor(
		id: number | null,
		createdAt: Date,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		logoPath: string | null,
		isPublic: boolean
	) {
		this.id = id
		this.createdAt = createdAt
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.logoPath = logoPath
		this.isPublic = isPublic
	}

	static createFromData(data: AnyObject) {
		return new GetArtistDTO(
			data?.["id"],
			data?.["createdAt"],
			data?.["name"],
			data?.["bio"],
			data?.["members"],
			data?.["genres"],
			data?.["logoPath"],
			data?.["isPublic"]
		)
	}
}
