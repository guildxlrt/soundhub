import { IMedia, ArtistId } from "Shared-utils"

// ANNOUNCE
export interface IAnnounce {
	artist_id: ArtistId
	title: string
	text: string
	imageUrl: string | null
	videoUrl: string | null
}

export interface INewAnnounce {
	artist_id: ArtistId
	title: string
	text: string
	media?: IMedia
}
