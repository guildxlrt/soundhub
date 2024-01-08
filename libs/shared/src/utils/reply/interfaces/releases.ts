import { ArtistId, ReleaseId } from "../../types"

// RELEASE
export interface INewReleaseSucc {
	message: string
	id: ReleaseId
}

export interface IReleaseSucc {
	id: ReleaseId
	artist_id: ArtistId
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
