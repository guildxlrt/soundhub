import { ReleaseID, SongID } from "../../types"

// SONG
export interface ISongSucc {
	id: SongID
	release_id: ReleaseID | undefined
	audioPath: string | undefined
	title: string | undefined
	featuring: number[] | undefined
	lyrics: string | null | undefined
}
