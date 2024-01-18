import { AnnounceId, ArtistId } from "../../entities"

// ANNOUNCE
export interface IAnnounceSucc {
	id: AnnounceId
	owner_id: ArtistId
	title: string | undefined
	text: string | undefined
	imageUrl: string | null | undefined
	videoUrl: string | null | undefined
}

export type IAnnouncesListSucc = Omit<IAnnounceSucc, "text" | "videoUrl">[]
export type IAnnouncesListItemSucc = IAnnouncesListSucc[0]
