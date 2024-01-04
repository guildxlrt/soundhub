import { EntityLayer } from "../../assets"
import { ArtistId, GenresArray, ReleaseId, ReleasePrice, ReleaseType } from "Shared-utils"

export class Release extends EntityLayer {
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: ReleasePrice | null
	genres: GenresArray
	coverUrl: string | null

	constructor(
		id: ReleaseId,
		artist_id: ArtistId,
		title: string,
		releaseType: ReleaseType,
		descript: string | null,
		price: null | ReleasePrice,
		genres: GenresArray,
		coverUrl: string | null,
		createdAt?: Date
	) {
		super(id, createdAt)

		this.artist_id = artist_id
		this.title = title
		this.releaseType = releaseType
		this.descript = descript
		this.price = price
		this.genres = genres
		this.coverUrl = coverUrl
	}
}
