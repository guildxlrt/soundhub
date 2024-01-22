import { ArtistID, EventID } from "Shared"
import { EntityLayer } from "./layers"

export class Event extends EntityLayer {
	readonly owner_id: ArtistID
	date: Date
	place: string
	artists: ArtistID[]
	title: string
	text: string
	imageUrl: string | null

	constructor(
		id: EventID | null,
		owner_id: ArtistID,
		date: Date,
		place: string,
		artists: ArtistID[],
		title: string,
		text: string,
		imageUrl: string | null
	) {
		super(id)

		this.owner_id = owner_id
		this.date = date
		this.artists = artists
		this.place = place
		this.title = title
		this.text = text
		this.imageUrl = imageUrl
	}
}
