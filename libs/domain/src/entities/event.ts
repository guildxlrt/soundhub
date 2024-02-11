import { ArtistProfileID, EventID } from "Shared"
import { EntityLayer } from "./layers"
import { ExtBackArtistsRepos } from "../repositories"
import { ArrayValidator, StringFormatter, FieldsValidator, DateFormatter } from "../tools"

export class Event extends EntityLayer {
	readonly organisator_id: ArtistProfileID
	date: Date
	place: string
	artists: ArtistProfileID[]
	title: string
	text: string
	imagePath: string | null

	private stringFormatter = new StringFormatter()
	private dateFormatter = new DateFormatter()
	private validator = new FieldsValidator()
	private artistsArrayValidator = new ArrayValidator()

	constructor(
		id: EventID | null,
		organisator_id: ArtistProfileID,
		date: Date,
		place: string,
		artists: ArtistProfileID[],
		title: string,
		text: string,
		imagePath: string | null
	) {
		super(id)

		this.organisator_id = organisator_id
		this.date = date
		this.artists = artists
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

	async validateArtistArray(service: ExtBackArtistsRepos) {
		await this.artistsArrayValidator.validateIDs(this.artists, service)
	}
}
