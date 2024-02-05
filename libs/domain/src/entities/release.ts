import { EntityLayer } from "./layers"
import { ArtistProfileID, GenresArray, ReleaseID, ReleasePrice, ReleaseType } from "Shared"
import { GenresFormatter, StringFormatter, FieldsValidator } from "../tools"

export class Release extends EntityLayer {
	readonly owner_id: ArtistProfileID
	title: string
	readonly releaseType: ReleaseType | null
	descript: string | null
	price: ReleasePrice | null
	genres: GenresArray
	coverPath: string | null

	private fieldsValidator = new FieldsValidator()
	private stringFormatter = new StringFormatter()
	private genresFormatter = new GenresFormatter()

	constructor(
		id: ReleaseID | null,
		owner_id: ArtistProfileID,
		title: string,
		releaseType: ReleaseType | null,
		descript: string | null,
		price: null | ReleasePrice,
		genres: GenresArray,
		coverPath: string | null
	) {
		super(id)

		this.owner_id = owner_id
		this.title = title
		this.releaseType = releaseType
		this.descript = descript
		this.price = price
		this.genres = genres
		this.coverPath = coverPath
	}

	setGenres(genres: GenresArray | string[]) {
		this.genres = genres as GenresArray
	}

	updateCoverPath(newCoverPath: string) {
		this.coverPath = newCoverPath
	}

	sanitize(isNew?: boolean) {
		if (isNew) this.title = this.stringFormatter.short(this.title)

		this.descript = this.stringFormatter.long(this.descript)
		this.fieldsValidator.price(this.price)
		this.genres = this.genresFormatter.format(this.genres)
	}

	validateReleaseType() {
		this.fieldsValidator.releaseType(this.releaseType)
	}
}
