import { ArtistID, ReleaseID } from "../typing"

// RELEASE
export interface INewReleaseSucc {
	message: string
	id: ReleaseID
}

export interface IReleaseSucc {
	id: ReleaseID
	owner_id: ArtistID
	title: string | undefined
	releaseType: string | undefined
	descript: string | null | undefined
	price: number | null | undefined
	genres: string[] | undefined
	songs: { audioUrl: string; title: string }[] | undefined
	coverUrl: string | null | undefined
}
export type IReleasesListSucc = Omit<IReleaseSucc, "descript" | "price" | "songs">[]
export type IReleasesListItemSucc = IReleasesListSucc[0]
