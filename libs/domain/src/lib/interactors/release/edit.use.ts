import { UsecaseLayer, ServicesType, EditReleaseUsecaseParams } from "../../../assets"
import { EditReleaseReplyDTO, ErrorMsg, formatters } from "Shared"
import { Release, Song } from "../../entities"

export class EditReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: EditReleaseUsecaseParams): Promise<EditReleaseReplyDTO> {
		try {
			const { songs } = inputs
			const { cover, data } = inputs.release
			const { owner_id, title, releaseType, descript, price, genres } = data

			// Operators
			// genres
			const cleanGenres = formatters.genres(genres, this.backend)

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

			return await this.services.releases.edit({ data: release, cover: cover }, newSongs)
		} catch (error) {
			return new EditReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
