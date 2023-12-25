import { AnnounceId, ArtistId, IAnnounce } from "Shared-utils"
import { EntityLayer } from "../../../assets"

export class Announce extends EntityLayer implements IAnnounce {
	artist_id: ArtistId
	title: string
	text: string
	imageUrl: string | null
	videoUrl: string | null

	constructor(
		id: AnnounceId,
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
