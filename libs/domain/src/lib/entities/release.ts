import { EntityLayer } from "./layers"
import {
	ArtistID,
	GenresArray,
	ReleaseID,
	ReleasePrice,
	ReleaseType,
	genresFormatter,
} from "Shared"

export class Release extends EntityLayer {
	readonly owner_id: ArtistID
	readonly title: string
	readonly releaseType: ReleaseType
	descript: string | null
	price: ReleasePrice | null
	genres: GenresArray
	coverUrl: string | null

	constructor(
		id: ReleaseID | null,
		owner_id: ArtistID,
		title: string,
		releaseType: ReleaseType,
		descript: string | null,
		price: null | ReleasePrice,
		genres: GenresArray,
		coverUrl: string | null
	) {
		super(id)

		this.owner_id = owner_id
		this.title = title
		this.releaseType = releaseType
		this.descript = descript
		this.price = price
		this.genres = genres
		this.coverUrl = coverUrl
	}
}
