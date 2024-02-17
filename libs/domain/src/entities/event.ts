import { ArtistProfileID, EventID } from "Shared"
import { EntityLayer } from "./layers"
import { StringFormatter, FieldsValidator, DateFormatter } from "../tools"

export class Event extends EntityLayer {
	readonly createdBy: ArtistProfileID
	date: Date
	place: string
	title: string
	text: string
	imagePath: string | null

	private stringFormatter = new StringFormatter()
	private dateFormatter = new DateFormatter()
	private validator = new FieldsValidator()

	constructor(
		id: EventID | null,
		createdBy: ArtistProfileID,
		date: Date,
		place: string,
		title: string,
		text: string,
		imagePath: string | null
	) {
		super(id)

		this.createdBy = createdBy
		this.date = date
		this.place = place
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}

	updateImagePath(newImagePath: string) {
		this.imagePath = newImagePath
	}

	sanitize() {
		this.validator.place(this.text)
		this.title = this.stringFormatter.short(this.title)
		this.text = this.stringFormatter.long(this.text)
		this.date = this.dateFormatter.format(this.date)
	}
}
