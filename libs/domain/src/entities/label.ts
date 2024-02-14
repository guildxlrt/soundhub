import {
	ArtistProfileID,
	ErrorMsg,
	GenresArray,
	PublicationStatusEnum,
	PublicationStatusType,
	htmlError,
} from "Shared"
import { EntityLayer } from "./layers"
import { ArrayValidator, GenresFormatter, StringFormatter } from "../tools"

export class Label extends EntityLayer {
	status: PublicationStatusType
	name: string
	creationDate: Date
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
		status: PublicationStatusType,
		name: string,
		creationDate: Date,
		bio: string,
		members: Record<string, any>,
		genres: GenresArray,
		website: string | null,
		country: string | null,
		logoPath: string | null
	) {
		super(id)

		this.status = status
		this.name = name
		this.creationDate = creationDate
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
		if (this.status !== PublicationStatusEnum.draft) throw ErrorMsg.htmlError(htmlError[403])

		this.arrayValidator.validateMembers(this.members)
		this.name = this.stringFormatter.short(this.name)
		this.bio = this.stringFormatter.long(this.bio)
		this.genres = this.genresFormatter.format(this.genres)
		// website
		// country
	}
}
