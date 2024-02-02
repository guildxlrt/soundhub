import { AnnounceID, ProfileID, StringFormatter } from "Shared"
import { EntityLayer } from "./layers"

export class Announce extends EntityLayer {
	readonly owner_id: ProfileID
	title: string
	text: string
	imagePath: string | null
	private formatter = new StringFormatter()

	constructor(
		id: AnnounceID | null,
		owner_id: ProfileID,
		title: string,
		text: string,
		imagePath: string | null
	) {
		super(id)

		this.owner_id = owner_id
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
