import { EntityLayer } from "./layers"
import {
	ArtistProfileID,
	ErrorMsg,
	GenresArray,
	ItemStatusEnum,
	ItemStatusType,
	RecordID,
	RecordPrice,
	RecordType,
	htmlError,
} from "Shared"
import { GenresFormatter, StringFormatter, FieldsValidator } from "../tools"

export class Record extends EntityLayer {
	readonly createdBy: ArtistProfileID
	status: ItemStatusType | null
	title: string
	readonly recordType: RecordType | null
	descript: string | null
	price: RecordPrice | null
	genres: GenresArray
	folderPath: string | null

	private fieldsValidator = new FieldsValidator()
	private stringFormatter = new StringFormatter()
	private genresFormatter = new GenresFormatter()

	constructor(
		id: RecordID | null,
		createdBy: ArtistProfileID,
		status: ItemStatusType | null,
		title: string,
		recordType: RecordType | null,
		descript: string | null,
		price: null | RecordPrice,
		genres: GenresArray,
		folderPath: string | null
	) {
		super(id)

		this.createdBy = createdBy
		this.status = status
		this.title = title
		this.recordType = recordType
		this.descript = descript
		this.price = price
		this.genres = genres
		this.folderPath = folderPath
	}

	setGenres(genres: GenresArray | string[]) {
		if (this.status !== ItemStatusEnum.draft) throw ErrorMsg.htmlError(htmlError[403])
		this.genres = genres as GenresArray
	}

	updateFolderPath(newFolderPath: string) {
		if (this.status !== ItemStatusEnum.draft) throw ErrorMsg.htmlError(htmlError[403])
		this.folderPath = newFolderPath
	}

	sanitize() {
		if (this.status !== ItemStatusEnum.draft) throw ErrorMsg.htmlError(htmlError[403])

		this.title = this.stringFormatter.short(this.title)
		this.descript = this.stringFormatter.long(this.descript)
		this.fieldsValidator.price(this.price)
		this.genres = this.genresFormatter.format(this.genres)
		this.fieldsValidator.recordType(this.recordType)
	}
}
