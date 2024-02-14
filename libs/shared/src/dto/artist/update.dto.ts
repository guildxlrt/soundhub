import { GenresArray, AnyObject } from "../../types"

export class UpdateArtistDTO {
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly delLogo?: boolean

	constructor(
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		delLogo?: boolean
	) {
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.delLogo = delLogo
	}

	static createFromInput(data: AnyObject) {
		return new UpdateArtistDTO(
			data?.["name"],
			data?.["bio"],
			data?.["members"],
			data?.["genres"],
			data?.["delLogo"]
		)
	}
}
