import { ArtistProfileID, ErrorMsg, ItemStatusEnum, ItemStatusType, htmlError } from "Shared"
import { EntityLayer } from "./layers"
import { ArrayValidator, StringFormatter } from "../tools"

export class Label extends EntityLayer {
	status: ItemStatusType | null
	name: string
	creationDate: Date
	bio: string | null
	website: string | null
	country: string | null
	logoPath: string | null

	private stringFormatter = new StringFormatter()
	private arrayValidator = new ArrayValidator()

	constructor(
		id: ArtistProfileID | null,
		status: ItemStatusType | null,
		name: string,
		creationDate: Date,
		bio: string | null,
		website: string | null,
		country: string | null,
		logoPath: string | null
	) {
		super(id)

		this.status = status
		this.name = name
		this.creationDate = creationDate
		this.bio = bio
		this.website = website
		this.country = country
		this.logoPath = logoPath
	}

	updateLogoPath(logoPath: string | null) {
		this.logoPath = logoPath as string
	}

	sanitize(): void {
		if (this.status !== ItemStatusEnum.draft) throw ErrorMsg.htmlError(htmlError[403])

		this.name = this.stringFormatter.short(this.name)
		this.bio = this.stringFormatter.long(this.bio)
		// website
		// country
	}
}
