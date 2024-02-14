import { AnnounceID, ArtistProfileID } from "Shared"
import { EntityLayer } from "./layers"
import { StringFormatter } from "../tools"

export class Announce extends EntityLayer {
	readonly publisher_id: ArtistProfileID
	title: string
	text: string
	imagePath: string | null
	private formatter = new StringFormatter()

	constructor(
		id: AnnounceID | null,
		publisher_id: ArtistProfileID,
		title: string,
		text: string,
		imagePath: string | null
	) {
		super(id)

		this.publisher_id = publisher_id
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}

	updateImagePath(newImagePath: string) {
		this.imagePath = newImagePath
	}

	sanitize() {
		this.title = this.formatter.short(this.title)
		this.text = this.formatter.long(this.text)
	}
}
