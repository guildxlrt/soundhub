import { UsecaseLayer, ServicesType } from "../../../assets"
import { ModifyReleaseReplyDTO, ErrorMsg, formatters, ModifyReleaseAdapter } from "Shared"
import { Release, Song } from "../../entities"

export class ModifyReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ModifyReleaseAdapter): Promise<ModifyReleaseReplyDTO> {
		try {
			const { songs } = inputs
			const { cover, data } = inputs.release
			const { owner_id, title, releaseType, descript, price, genres } = data

			// Operators
			// genres
			const cleanGenres = formatters.genres(genres)

			// saving
			const release = new Release(
				null,
				owner_id as number,
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

			return await this.services.releases.modify({ data: release, cover: cover }, newSongs)
		} catch (error) {
			return new ModifyReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
