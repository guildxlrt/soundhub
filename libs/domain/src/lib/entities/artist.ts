import { ArtistID, GenresArray, UserAuthID } from "Shared"
import { EntityLayer } from "./layers"

export class Artist extends EntityLayer {
	readonly user_auth_id: UserAuthID | null
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatarUrl: string | null

	constructor(
		id: ArtistID | null,
		user_auth_id: UserAuthID | null,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		avatarUrl: string | null
	) {
		super(id)

		this.user_auth_id = user_auth_id
		this.name = name
		this.bio = bio

		members !== null && members.length >= 1 ? (this.members = members) : (this.members = [])

		this.genres = genres
		this.avatarUrl = avatarUrl
	}
}
