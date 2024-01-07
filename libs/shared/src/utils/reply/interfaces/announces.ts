import { ArtistId } from "../../types"

// ANNOUNCE
export interface IAnnounceSucc {
	artist_id: ArtistId
	title: string
	text: string
	imageUrl: string | null
	videoUrl: string | null
}

export type IAnnouncesListSucc = Omit<IAnnounceSucc, "text" | "songs_list">[]
export type IAnnouncesListItemSucc = IAnnouncesListSucc[0]
