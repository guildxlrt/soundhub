import { AnyObject } from "../../types"

export class PostLabelDTO {
	readonly status: string
	readonly name: string
	readonly creationDate: Date
	readonly bio: string | null
	readonly website: string | null
	readonly country: string
	readonly logoPath: string

	constructor(
		status: string,
		name: string,
		creationDate: Date,
		bio: string | null,
		website: string | null,
		country: string,
		logoPath: string
	) {
		this.status = status
		this.name = name
		this.creationDate = creationDate
		this.bio = bio
		this.website = website
		this.country = country
		this.logoPath = logoPath
	}

	static createFromInput(label: AnyObject) {
		return new PostLabelDTO(
			label?.["status"],
			label?.["name"],
			label?.["creationDate"],
			label?.["bio"],
			label?.["website"],
			label?.["country"],
			label?.["logoPath"]
		)
	}
}
