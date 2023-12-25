import { BaseEntity } from "../../../assets"
import { ArtistId, GenresArray, ReleaseId, ReleasePrice, ReleaseType, SongId } from "Shared-utils"

export class Release extends BaseEntity {
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: null | ReleasePrice
	genres: GenresArray
	songs: SongId[]
	coverUrl?: string

	constructor(
		id: ReleaseId,
		createdAt: Date,
		artist_id: ArtistId,
		title: string,
		releaseType: ReleaseType,
		descript: string | null,
		price: null | ReleasePrice,
		genres: GenresArray,
		songs: SongId[],
		coverUrl?: string
	) {
		super(id, createdAt)

		this.artist_id = artist_id
		this.title = title
		this.releaseType = releaseType
		this.descript = descript
		this.price = price
		this.genres = genres
		this.songs = songs
		this.coverUrl = coverUrl
	}
}
