import { ArtistId, EventId } from "../../utils"
import { EntityLayer } from "./layers"

export class Event extends EntityLayer {
	planner: ArtistId | undefined
	date: Date
	place: string
	artists: ArtistId[]
	title: string
	text: string
	imageUrl?: string

	constructor(
		id: EventId | undefined,
		planner: ArtistId | undefined,
		date: Date,
		place: string,
		artists: ArtistId[],
		title: string,
		text: string,
		imageUrl?: string,
		createdAt?: Date
	) {
		super(id, createdAt)

		this.planner = planner
		this.date = date
		this.artists = artists
		this.place = place
		this.title = title
		this.text = text
		this.imageUrl = imageUrl
	}
}
