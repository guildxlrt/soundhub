import {
	ArtistProfileID,
	ErrorMsg,
	GenresArray,
	UserAuthID,
	UserStatusEnum,
	UserStatusType,
	htmlError,
} from "Shared"
import { EntityLayer } from "./layers"
import { ArrayValidator, GenresFormatter, StringFormatter } from "../tools"

export class Artist extends EntityLayer {
	readonly user_auth_id: UserAuthID | null
	status: UserStatusType | null
	name: string
	bio: string
	members: Record<string, any>
	genres: GenresArray
	website: string | null
	country: string | null
	logoPath: string | null

	private stringFormatter = new StringFormatter()
	private genresFormatter = new GenresFormatter()
	private arrayValidator = new ArrayValidator()

	constructor(
		id: ArtistProfileID | null,
		user_auth_id: UserAuthID | null,
		status: UserStatusType | null,
		name: string,
		bio: string,
		members: Record<string, any>,
		genres: GenresArray,
		website: string | null,
		country: string | null,
		logoPath: string | null
	) {
		super(id)

		this.user_auth_id = user_auth_id
		this.status = status
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = [genres[0], genres[1] ? genres[1] : null, genres[2] ? genres[2] : null]
		this.website = website
		this.country = country
		this.logoPath = logoPath
	}

	setGenres(genres: GenresArray | string[]) {
		this.genres = genres as GenresArray
	}
	updateLogoPath(logoPath: string | null) {
		this.logoPath = logoPath as string
	}

	sanitize(): void {
		if (this.status === (UserStatusEnum.suspended || UserStatusEnum.archived))
			throw ErrorMsg.htmlError(htmlError[403])

		this.arrayValidator.validateMembers(this.members)
		this.name = this.stringFormatter.short(this.name)
		this.bio = this.stringFormatter.long(this.bio)
		this.genres = this.genresFormatter.format(this.genres)
		// website
		// country
	}
}
