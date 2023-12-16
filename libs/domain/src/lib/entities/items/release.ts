import { BaseEntity } from "../../../assets"
import { ArtistId } from "../users/artist"
import { Song } from "./song"
import { GenresArray, ReleaseType } from "Shared-utils"

export class Release extends BaseEntity {
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: null | number
	genres: GenresArray
	songs: Song[]
	coverUrl?: string

	constructor(
		id: number,
		createdAt: Date,
		artist_id: ArtistId,
		title: string,
		releaseType: ReleaseType,
		descript: string | null,
		price: null | number,
		genres: GenresArray,
		songs: Song[],
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

export type ReleaseId = Pick<Release, "id">["id"]
export type ReleasePrice = Pick<Release, "price">["price"]
