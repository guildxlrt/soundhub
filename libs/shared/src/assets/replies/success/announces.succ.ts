import { AnnounceID, ProfileID } from "../../types"

// ANNOUNCE
export interface IAnnounceSucc {
	id: AnnounceID
	owner_id: ProfileID
	title: string | undefined
	text: string | undefined
	imagePath: string | null | undefined
}

export type IAnnouncesListSucc = Omit<IAnnounceSucc, "text" | "videoUrl">[]
export type IAnnouncesListItemSucc = IAnnouncesListSucc[0]
