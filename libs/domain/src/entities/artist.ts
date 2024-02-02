import {
	ProfileID,
	GenresArray,
	UserAuthID,
	StringFormatter,
	FieldsValidator,
	GenresFormatter,
	ArtistsArrayValidator,
	IMember,
} from "Shared"
import { EntityLayer } from "./layers"

export class Artist extends EntityLayer {
	readonly user_auth_id: UserAuthID | null
	name: string
	bio: string
	members: IMember[]
	genres: GenresArray
	avatarPath: string | null

	private stringFormatter = new StringFormatter()
	private genresFormatter = new GenresFormatter()
	private artistsArrayValidator = new ArtistsArrayValidator()

	constructor(
		id: ProfileID | null,
		user_auth_id: UserAuthID | null,
		name: string,
		bio: string,
		members: IMember[],
		genres: GenresArray,
		avatarPath: string | null
	) {
		super(id)

		this.user_auth_id = user_auth_id
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.avatarPath = avatarPath
	}

	setGenres(genres: GenresArray | string[]) {
		this.genres = genres as GenresArray
	}
	updateAvatarPath(avatarPath: string | null) {
		this.avatarPath = avatarPath
	}

	async sanitize() {
		this.name = this.stringFormatter.short(this.name)
		this.bio = this.stringFormatter.long(this.bio)
		await this.artistsArrayValidator.validateMembers(this.members)
		this.genres = this.genresFormatter.format(this.genres)
	}
}
