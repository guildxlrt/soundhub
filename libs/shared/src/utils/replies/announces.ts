import { AnnounceID, ArtistID } from "../types"

// ANNOUNCE
export interface IAnnounceSucc {
	id: AnnounceID
	owner_id: ArtistID
	title: string | undefined
	text: string | undefined
	imageUrl: string | null | undefined
}

export type IAnnouncesListSucc = Omit<IAnnounceSucc, "text" | "videoUrl">[]
export type IAnnouncesListItemSucc = IAnnouncesListSucc[0]