import { BaseEntity } from "../../../assets"
import { ArtistId } from "../users/artist"

export class Event extends BaseEntity {
	date: Date
	organizers: ArtistId[]
	title: string
	text: string
	imageUrl: string | null

	constructor(
		id: number,
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

export type EventId = Pick<Event, "id">["id"]
