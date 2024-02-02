import { ProfileID, EventID, ArtistsArrayValidator, StringFormatter, FieldsValidator } from "Shared"
import { EntityLayer } from "./layers"
import { ExtBackArtistsRepos } from "../repositories"

export class Event extends EntityLayer {
	readonly owner_id: ProfileID
	date: Date
	place: string
	artists: ProfileID[]
	title: string
	text: string
	imagePath: string | null

	private formatter = new StringFormatter()
	private validator = new FieldsValidator()
	private artistsArrayValidator = new ArtistsArrayValidator()

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
