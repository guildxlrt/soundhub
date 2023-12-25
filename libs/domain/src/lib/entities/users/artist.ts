import { ArtistId, GenresArray, GenreType, UserAuthId } from "Shared-utils"
import { BaseEntity } from "../../../assets"

export class Artist extends BaseEntity {
	readonly user_auth_id: UserAuthId
	name: string
	bio: string
	avatarUrl: string | null
	members: string[]
	genres: GenresArray

	constructor(
		id: ArtistId,
		createdAt: Date,
		user_auth_id: UserAuthId,
		name: string,
		bio: string,
		avatarUrl: string | null,
		members: string[] | null,
		genre1: GenreType,
		genre2?: GenreType,
		genre3?: GenreType
	) {
		super(id, createdAt)

		this.user_auth_id = user_auth_id
		this.name = name
		this.bio = bio
		this.avatarUrl = avatarUrl

		if (members !== null && members.length >= 1) this.members = members
		else this.members = []

		this.genres = [genre1, genre2, genre3]
	}
}
