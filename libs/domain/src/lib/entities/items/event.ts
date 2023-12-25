import { ArtistId, EventId } from "Shared-utils"
import { BaseEntity } from "../../../assets"

export class Event extends BaseEntity {
	date: Date
	organizers: ArtistId[]
	title: string
	text: string
	imageUrl: string | null

	constructor(
		id: EventId,
		createdAt: Date,

		date: Date,
		organizers: ArtistId[],
		title: string,
		text: string,
		imageUrl: string | null
	) {
		super(id, createdAt)

		this.date = date
		this.organizers = organizers
		this.title = title
		this.text = text
		this.imageUrl = imageUrl
	}
}
