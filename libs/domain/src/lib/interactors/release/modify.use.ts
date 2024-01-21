import { UsecaseLayer, ServicesType } from "../../../assets"
import { ModifyReleaseReplyDTO, ErrorMsg, genresFormatter, ModifyReleaseAdapter } from "Shared"
import { Release, Song } from "../../entities"

export class ModifyReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ModifyReleaseAdapter): Promise<ModifyReleaseReplyDTO> {
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

				return new Song(null, null, "placeholder", title, featuring, lyrics)
			})

			return await this.services.releases.modify(release, newSongs)
		} catch (error) {
			return new ModifyReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
