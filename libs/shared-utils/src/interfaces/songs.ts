import { ReleaseId, SongId } from "Shared-utils"

// SONG
export interface ISong {
	id: SongId
	release_id: ReleaseId
	audioUrl: string
	title: string
	featuring: number[] | null
	lyrics: string | null
}
