import { AnnounceId, ArtistId, IAnnounce } from "Shared"
import { EntityLayer } from "./layers"

export class Announce extends EntityLayer implements IAnnounce {
	owner_id: ArtistId | undefined
	title: string
	text: string
	imageUrl?: string
	videoUrl?: string

	constructor(
		id: AnnounceId | undefined,
		owner_id: ArtistId | undefined,
		title: string,
		text: string,
		imageUrl?: string,
		videoUrl?: string,
		createdAt?: Date
	) {
		super(id, createdAt)

		this.owner_id = owner_id
		this.title = title
		this.text = text
		this.imageUrl = imageUrl
		this.videoUrl = videoUrl
	}
}
