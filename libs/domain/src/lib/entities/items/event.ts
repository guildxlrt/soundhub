import { ArtistId, EventId, IEvent } from "Shared-utils"
import { EntityLayer } from "../../../assets"

export class Event extends EntityLayer implements IEvent {
	date: Date
	planner: ArtistId
	artists: ArtistId[]
	title: string
	text: string
	imageUrl: string | null

	constructor(
		id: EventId,
		createdAt: Date,
		planner: ArtistId,
		date: Date,
		artists: ArtistId[],
		title: string,
		text: string,
		imageUrl: string | null
	) {
		super(id, createdAt)

		this.planner = planner
		this.date = date
		this.artists = artists
		this.title = title
		this.text = text
		this.imageUrl = imageUrl
	}
}
