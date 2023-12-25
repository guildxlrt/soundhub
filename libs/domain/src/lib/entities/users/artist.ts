import { ArtistId, GenresArray, IArtist, UserAuthId } from "Shared-utils"
import { EntityLayer } from "../../../assets"

export class Artist extends EntityLayer implements IArtist {
	readonly user_auth_id: UserAuthId
	name: string
	bio: string | null
	avatarUrl: string | null
	members: string[]
	genres: GenresArray

	constructor(
		id: ArtistId,
		createdAt: Date,
		user_auth_id: UserAuthId,
		name: string,
		bio: string,
		members: string[] | null,
		genres: GenresArray,
		avatarUrl: string | null
	) {
		super(id, createdAt)

		this.user_auth_id = user_auth_id
		this.name = name
		this.bio = bio

		if (members !== null && members.length >= 1) this.members = members
		else this.members = []

		this.genres = genres
		this.avatarUrl = avatarUrl
	}
}
