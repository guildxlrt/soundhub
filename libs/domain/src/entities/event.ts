import { ArtistProfileID, EventID } from "Shared"
import { EntityLayer } from "./layers"
import { ExtBackArtistsRepos } from "../repositories"
import { ArrayValidator, StringFormatter, FieldsValidator } from "../tools"

export class Event extends EntityLayer {
	readonly organisator_id: ArtistProfileID
	date: Date
	place: string
	artists: ArtistProfileID[]
	title: string
	text: string
	imagePath: string | null

	private formatter = new StringFormatter()
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
		this.title = this.formatter.short(this.title)
		this.text = this.formatter.long(this.text)
		this.validator.date(this.date)
		this.validator.place(this.text)
	}

	async validateArtistArray(service: ExtBackArtistsRepos) {
		await this.artistsArrayValidator.validateIDs(this.artists, service)
	}
}
