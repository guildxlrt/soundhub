import { AnnounceID, ArtistID } from "Shared"
import { EntityLayer } from "./layers"

export class Announce extends EntityLayer {
	readonly owner_id: ArtistID
	title: string
	text: string
	imageUrl: string | null

	constructor(
		id: AnnounceID | null,
		owner_id: ArtistID,
		title: string,
		text: string,
		imageUrl: string | null
	) {
		super(id)

		this.owner_id = owner_id
		this.title = title
		this.text = text
		this.imageUrl = imageUrl
	}
}