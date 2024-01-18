import { CreateReleaseReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { NewReleaseParams } from "Shared"
import { ErrorMsg, formatters } from "Shared"
import { Release, Song } from "Domain"

export class CreateReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: NewReleaseParams): Promise<CreateReleaseReplyDTO> {
		try {
			const { songs } = inputs
			const { owner_id, title, releaseType, descript, price, genres } = inputs.release

			// Operators
			// genres
			const cleanGenres = formatters.genres(genres)

			// saving
			const release = new Release(
				undefined,
				owner_id,
				title,
				releaseType,
				descript,
				price,
				cleanGenres,
				null
			)
			const newSongsArray = songs.map((song) => {
				const { title, featuring, lyrics } = song
				return new Song(undefined, undefined, "placeholder", title, featuring, lyrics)
			})

			return await this.services.releases.create(
				new NewReleaseParams(release, newSongsArray, cleanGenres)
			)
		} catch (error) {
			return new CreateReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
