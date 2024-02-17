import { GenresArray, AnyObject } from "../../types"

export class UpdateArtistDTO {
	readonly id: number
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly website: string | null
	readonly country: string | null
	readonly deleteLogo?: boolean

	constructor(
		id: number,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		website: string | null,
		country: string | null,
		deleteLogo?: boolean
	) {
		this.id = id
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.website = website
		this.country = country
		this.deleteLogo = deleteLogo
	}

	static createFromInput(data: AnyObject) {
		return new UpdateArtistDTO(
			data?.["name"],
			data?.["bio"],
			data?.["members"],
			data?.["genres"],
			data?.["website"],
			data?.["country"],
			data?.["deleteLogo"]
		)
	}
}
