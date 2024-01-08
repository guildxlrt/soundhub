import { AnnounceId, ArtistId } from "../../types"

// ANNOUNCE
export interface IAnnounceSucc {
	id: AnnounceId
	artist_id: ArtistId
	title: string | undefined
	text: string | undefined
	imageUrl: string | null | undefined
	videoUrl: string | null | undefined
}

export type IAnnouncesListSucc = Omit<IAnnounceSucc, "text" | "videoUrl">[]
export type IAnnouncesListItemSucc = IAnnouncesListSucc[0]
