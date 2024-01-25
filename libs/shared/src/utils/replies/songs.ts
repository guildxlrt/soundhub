import { ReleaseID, SongID } from "../typing"

// SONG
export interface ISongSucc {
	id: SongID
	release_id: ReleaseID | undefined
	audioUrl: string | undefined
	title: string | undefined
	featuring: number[] | undefined
	lyrics: string | null | undefined
}
