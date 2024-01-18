import { ArtistId, EventId, IEvent } from "Shared"
import { EntityLayer } from "./layers"

export class Event extends EntityLayer implements IEvent {
	owner_id: ArtistId | undefined
	date: Date
	place: string
	artists: ArtistId[]
	title: string
	text: string
	imageUrl?: string

	constructor(
		id: EventId | undefined,
		owner_id: ArtistId | undefined,
		date: Date,
		place: string,
		artists: ArtistId[],
		title: string,
		text: string,
		imageUrl?: string,
		createdAt?: Date
	) {
		super(id, createdAt)

		this.owner_id = owner_id
		this.date = date
		this.artists = artists
		this.place = place
		this.title = title
		this.text = text
		this.imageUrl = imageUrl
	}
}
