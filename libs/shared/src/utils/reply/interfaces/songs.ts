import { ReleaseId, SongId } from "../../types"

// SONG
export interface ISongSucc {
	id: SongId
	release_id: ReleaseId
	audioUrl: string
	title: string
	featuring: number[] | null
	lyrics: string | null
}
