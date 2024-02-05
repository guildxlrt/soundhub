import { ArtistProfileID, GenresArray, UserAuthID } from "Shared"
import { EntityLayer } from "./layers"
import { ArrayValidator, GenresFormatter, StringFormatter } from "../tools"

export class Artist extends EntityLayer {
	readonly user_auth_id: UserAuthID | null
	name: string
	bio: string
	members: Record<string, any>
	genres: GenresArray
	avatarPath: string | null

	private stringFormatter = new StringFormatter()
	private genresFormatter = new GenresFormatter()
	private arrayValidator = new ArrayValidator()

	constructor(
		id: ArtistProfileID | null,
		user_auth_id: UserAuthID | null,
		name: string,
		bio: string,
		members: Record<string, any>,
		genres: GenresArray,
		avatarPath: string | null
	) {
		super(id)

		this.user_auth_id = user_auth_id
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = [genres[0], genres[1] ? genres[1] : null, genres[2] ? genres[2] : null]
		this.avatarPath = avatarPath
	}

	setGenres(genres: GenresArray | string[]) {
		this.genres = genres as GenresArray
	}
	updateAvatarPath(avatarPath: string | null) {
		this.avatarPath = avatarPath as string
	}

	sanitize(): void {
		this.arrayValidator.validateMembers(this.members)
		this.name = this.stringFormatter.short(this.name)
		this.bio = this.stringFormatter.long(this.bio)
		this.genres = this.genresFormatter.format(this.genres)
	}
}
