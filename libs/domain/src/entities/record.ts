import { EntityLayer } from "./layers"
import {
	ArtistProfileID,
	ErrorMsg,
	GenresArray,
	RecordID,
	RecordPrice,
	RecordType,
	htmlError,
} from "Shared"
import { GenresFormatter, StringFormatter, FieldsValidator } from "../tools"

export class Record extends EntityLayer {
	readonly publisher_id: ArtistProfileID
	title: string
	readonly recordType: RecordType | null
	descript: string | null
	price: RecordPrice | null
	genres: GenresArray
	folderPath: string | null
	isPublic: boolean
	isReadOnly: boolean

	private fieldsValidator = new FieldsValidator()
	private stringFormatter = new StringFormatter()
	private genresFormatter = new GenresFormatter()

	constructor(
		id: RecordID | null,
		publisher_id: ArtistProfileID,
		title: string,
		recordType: RecordType | null,
		descript: string | null,
		price: null | RecordPrice,
		genres: GenresArray,
		folderPath: string | null,
		isPublic: boolean,
		isReadOnly: boolean
	) {
		super(id)

		this.publisher_id = publisher_id
		this.title = title
		this.recordType = recordType
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

	validateRecordType() {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])

		this.fieldsValidator.recordType(this.recordType)
	}
}
