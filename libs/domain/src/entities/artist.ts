import { ProfileID, GenresArray, UserAuthID, AnyObject } from "Shared"
import { EntityLayer } from "./layers"

export class Artist extends EntityLayer {
	readonly user_auth_id: UserAuthID | null
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatarPath: string | null

	constructor(
		id: ProfileID | null,
		user_auth_id: UserAuthID | null,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		avatarPath: string | null
	) {
		super(id)

		this.user_auth_id = user_auth_id
		this.name = name
		this.bio = bio

		members !== null && members.length >= 1 ? (this.members = members) : (this.members = [])

		this.genres = genres
		this.avatarPath = avatarPath
	}

	setGenres(genres: GenresArray | string[]) {
		this.genres = genres as GenresArray
	}
	updateAvatarPath(avatarPath: string | null) {
		this.avatarPath = avatarPath
	}
}
