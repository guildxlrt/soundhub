import { ReleaseId, SongId } from "Shared-utils"

// SONG
export interface ISong {
	id: SongId
	release_id: ReleaseId
	title: string
	audioUrl: string
	featuring: number[] | null
	lyrics: string | null
}
