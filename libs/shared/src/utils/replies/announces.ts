import { AnnounceID, ArtistID } from "../typing"

// ANNOUNCE
export interface IAnnounceSucc {
	id: AnnounceID
	owner_id: ArtistID
	title: string | undefined
	text: string | undefined
	imagePath: string | null | undefined
}

export type IAnnouncesListSucc = Omit<IAnnounceSucc, "text" | "videoUrl">[]
export type IAnnouncesListItemSucc = IAnnouncesListSucc[0]
