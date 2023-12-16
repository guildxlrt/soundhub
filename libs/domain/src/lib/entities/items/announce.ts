import { BaseEntity } from "../../../assets"
import { ArtistId } from "../users/artist"

export class Announce extends BaseEntity {
	artist_id: ArtistId
	title: string
	text: string
	imageUrl: string | null
	videoUrl: string | null

	constructor(
		id: number,
		createdAt: Date,

		artist_id: ArtistId,
		title: string,
		text: string,
		imageUrl: string | null,
		videoUrl: string | null
	) {
		super(id, createdAt)

		this.artist_id = artist_id
		this.title = title
		this.text = text
		this.imageUrl = imageUrl
		this.videoUrl = videoUrl
	}
}

export type AnnounceId = Pick<Announce, "id">["id"]
