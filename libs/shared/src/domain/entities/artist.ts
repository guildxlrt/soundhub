import { ArtistId, GenresArray, UserAuthId } from "../../utils"
import { EntityLayer } from "./layers"

export class Artist extends EntityLayer {
	user_auth_id: UserAuthId | undefined
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatarUrl?: string

	constructor(
		id: ArtistId | undefined,
		user_auth_id: UserAuthId | undefined,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		avatarUrl?: string,
		createdAt?: Date
	) {
		super(id, createdAt)
		if (!createdAt) this.createdAt = new Date()

		this.user_auth_id = user_auth_id
		this.name = name
		this.bio = bio

		if (members !== null && members.length >= 1) this.members = members
		else this.members = []

		this.genres = genres
		this.avatarUrl = avatarUrl
	}
}
