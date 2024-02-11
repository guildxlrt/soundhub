import { ArtistProfileID, ErrorMsg, ReleaseID, SongID, htmlError } from "Shared"
import { EntityLayer } from "./layers"
import { ExtBackArtistsRepos } from "../repositories"
import { StringFormatter, ArrayValidator } from "../tools"

export class Song extends EntityLayer {
	readonly release_id: ReleaseID | null
	audioPath: string | null
	title: string
	readonly feats: ArtistProfileID[]
	lyrics: string | null
	isReadOnly: boolean

	private formatter = new StringFormatter()
	private artistsArrayValidator = new ArrayValidator()

	constructor(
		id: SongID | null,
		release_id: ReleaseID | null,
		audioPath: string | null,
		title: string,
		feats: ArtistProfileID[],
		lyrics: string | null,
		isReadOnly: boolean
	) {
		super(id)

		this.release_id = release_id
		this.audioPath = audioPath
		this.title = title
		this.lyrics = lyrics
		this.isReadOnly = isReadOnly

		feats !== null && feats.length >= 1 ? (this.feats = feats) : (this.feats = [])
	}

	setAudioPath(newAudioPath: string) {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])

		this.audioPath = newAudioPath
	}

	async sanitize(isNew?: true) {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])
		if (isNew) this.title = this.formatter.short(this.title)

		this.lyrics = this.formatter.long(this.lyrics)
	}

	async validateArtistArray(service: ExtBackArtistsRepos) {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])

		await this.artistsArrayValidator.validateIDs(this.feats, service)
	}
}
