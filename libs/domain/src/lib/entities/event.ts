import { ArtistId, EventId } from "Shared-utils"
import { EntityLayer } from "../../assets"

export class Event extends EntityLayer {
	planner: ArtistId | undefined
	date: Date
	place: string
	artists: ArtistId[]
	title: string
	text: string
	imageUrl: string | null

	constructor(
		id: EventId | undefined,
		planner: ArtistId | undefined,
		date: Date,
		place: string,
		artists: ArtistId[],
		title: string,
		text: string,
		imageUrl: string | null,
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
