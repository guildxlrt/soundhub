import { EntityLayer } from "./layers"
import {
	ArtistProfileID,
	ErrorMsg,
	GenresArray,
	ReleaseID,
	ReleasePrice,
	ReleaseType,
	htmlError,
} from "Shared"
import { GenresFormatter, StringFormatter, FieldsValidator } from "../tools"

export class Release extends EntityLayer {
	readonly owner_id: ArtistProfileID
	title: string
	readonly releaseType: ReleaseType | null
	descript: string | null
	price: ReleasePrice | null
	genres: GenresArray
	folderPath: string | null
	isPublic: boolean
	isReadOnly: boolean

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
		folderPath: string | null,
		isPublic: boolean,
		isReadOnly: boolean
	) {
		super(id)

		this.owner_id = owner_id
		this.title = title
		this.releaseType = releaseType
		this.descript = descript
		this.price = price
		this.genres = genres
		this.folderPath = folderPath
		this.isPublic = isPublic
		this.isReadOnly = isReadOnly
	}

	setGenres(genres: GenresArray | string[]) {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])
		this.genres = genres as GenresArray
	}

	updateFolderPath(newFolderPath: string) {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])
		this.folderPath = newFolderPath
	}

	sanitize(isNew?: boolean) {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])
		if (isNew) this.title = this.stringFormatter.short(this.title)

		this.descript = this.stringFormatter.long(this.descript)
		this.fieldsValidator.price(this.price)
		this.genres = this.genresFormatter.format(this.genres)
	}

	validateReleaseType() {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])

		this.fieldsValidator.releaseType(this.releaseType)
	}
}
