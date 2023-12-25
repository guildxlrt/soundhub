import { EntityLayer } from "../../../assets"
import {
	ArtistId,
	GenresArray,
	IRelease,
	ReleaseId,
	ReleasePrice,
	ReleaseType,
	SongId,
} from "Shared-utils"

export class Release extends EntityLayer implements IRelease {
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: ReleasePrice | null
	genres: GenresArray
	songs: SongId[]
	coverUrl: string | null

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
		coverUrl: string | null
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
