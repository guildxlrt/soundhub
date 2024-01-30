import { EntityLayer } from "./layers"
import { ProfileID, GenresArray, ReleaseID, ReleasePrice, ReleaseType } from "Shared"

export class Release extends EntityLayer {
	readonly owner_id: ProfileID
	readonly title: string
	readonly releaseType: ReleaseType | null
	descript: string | null
	price: ReleasePrice | null
	genres: GenresArray
	coverPath: string | null

	constructor(
		id: ReleaseID | null,
		owner_id: ProfileID,
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
}
