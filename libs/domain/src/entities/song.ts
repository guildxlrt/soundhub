import { ProfileID, ReleaseID, SongID } from "Shared"
import { EntityLayer } from "./layers"
import { ExtBackArtistsRepos } from "../repositories"
import { StringFormatter, ArtistsArrayValidator } from "../tools"

export class Song extends EntityLayer {
	readonly release_id: ReleaseID | null
	audioPath: string | null
	title: string
	readonly feats: ProfileID[]
	lyrics: string | null

	private formatter = new StringFormatter()
	private artistsArrayValidator = new ArtistsArrayValidator()

	constructor(
		id: SongID | null,
		release_id: ReleaseID | null,
		audioPath: string | null,
		title: string,
		feats: ProfileID[],
		lyrics: string | null
	) {
		super(id)

		this.release_id = release_id
		this.audioPath = audioPath
		this.title = title
		this.lyrics = lyrics

		feats !== null && feats.length >= 1 ? (this.feats = feats) : (this.feats = [])
	}

	setAudioPath(newAudioPath: string) {
		this.audioPath = newAudioPath
	}

	async sanitize(isNew?: true) {
		if (isNew) this.title = this.formatter.short(this.title)

		this.lyrics = this.formatter.long(this.lyrics)
	}

	async validateArtistArray(service: ExtBackArtistsRepos) {
		await this.artistsArrayValidator.validateIDs(this.feats, service)
	}
}
