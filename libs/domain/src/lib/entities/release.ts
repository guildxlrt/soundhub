import { EntityLayer } from "./layers"
import { ArtistId, GenresArray, IRelease, ReleaseId, ReleasePrice, ReleaseType } from "Shared"

export class Release extends EntityLayer implements IRelease {
	owner_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: ReleasePrice | null
	genres: GenresArray
	coverUrl: string | null

	constructor(
		id: ReleaseId | undefined,
		owner_id: ArtistId,
		title: string,
		releaseType: ReleaseType,
		descript: string | null,
		price: null | ReleasePrice,
		genres: GenresArray,
		coverUrl: string | null,
		createdAt?: Date
	) {
		super(id, createdAt)

		this.owner_id = owner_id
		this.title = title
		this.releaseType = releaseType
		this.descript = descript
		this.price = price
		this.genres = genres
		this.coverUrl = coverUrl
	}
}
