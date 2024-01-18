import { ArtistId, GenresArray, IArtist, UserAuthId } from "Shared"
import { EntityLayer } from "./layers"

export class Artist extends EntityLayer implements IArtist {
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

		members !== null && members.length >= 1 ? (this.members = members) : (this.members = [])

		this.genres = genres
		this.avatarUrl = avatarUrl
	}
}
