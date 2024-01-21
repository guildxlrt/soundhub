import { CreateReleaseReplyDTO, ErrorMsg, NewReleaseAdapter, genresFormatter } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"

import { Release, Song } from "Domain"

export class CreateReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: NewReleaseAdapter): Promise<CreateReleaseReplyDTO> {
		try {
			const { songs } = inputs
			const { owner_id, title, releaseType, descript, price, genres } = inputs.release

			// Operators
			// genres
			const cleanGenres = genresFormatter.format(genres)

			// saving
			const release = new Release(
				null,
				owner_id,
				title,
				releaseType,
				descript,
				price,
				cleanGenres,
				null
			)
			const newSongs = songs.map((song) => {
				const { title, featuring, lyrics } = song

				const data = new Song(null, null, "placeholder", title, featuring, lyrics)

				return { data: data, audio: song.audio }
			})

			return await this.services.releases.create(release, newSongs)
		} catch (error) {
			return new CreateReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
