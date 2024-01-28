import { ProfileID, EventID } from "Shared"
import { EntityLayer } from "./layers"

export class Event extends EntityLayer {
	readonly owner_id: ProfileID
	date: Date
	place: string
	artists: ProfileID[]
	title: string
	text: string
	imagePath: string | null

	constructor(
		id: EventID | null,
		owner_id: ProfileID,
		date: Date,
		place: string,
		artists: ProfileID[],
		title: string,
		text: string,
		imagePath: string | null
	) {
		super(id)

		this.owner_id = owner_id
		this.date = date
		this.artists = artists
		this.place = place
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}
}
