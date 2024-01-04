import { AnnounceId, ArtistId } from "Shared-utils"
import { EntityLayer } from "../../assets"

export class Announce extends EntityLayer {
	artist_id: ArtistId
	title: string
	text: string
	imageUrl: string | null
	videoUrl: string | null

	constructor(
		id: AnnounceId,
		artist_id: ArtistId,
		title: string,
		text: string,
		imageUrl: string | null,
		videoUrl: string | null,
		createdAt?: Date
	) {
		super(id, createdAt)

		this.artist_id = artist_id
		this.title = title
		this.text = text
		this.imageUrl = imageUrl
		this.videoUrl = videoUrl
	}
}
