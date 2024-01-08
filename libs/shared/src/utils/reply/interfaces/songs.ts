import { ReleaseId, SongId } from "../../types"

// SONG
export interface ISongSucc {
	id: SongId
	release_id: ReleaseId | undefined
	audioUrl: string | undefined
	title: string | undefined
	featuring: number[] | undefined
	lyrics: string | null | undefined
}
