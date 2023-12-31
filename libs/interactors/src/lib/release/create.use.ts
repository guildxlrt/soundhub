import { DatabaseServices } from "Infra-backend"
import { CreateReleaseInputDTO, CreateReleaseReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { NewReleaseParams, Release, Song } from "Domain"
import { formatters } from "Operators"
import { ErrorMsg } from "Shared-utils"

export class CreateReleaseUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: CreateReleaseInputDTO): Promise<CreateReleaseReplyDTO> {
		try {
			const { songs } = inputs
			const { artist_id, title, releaseType, descript, price, genres } = inputs.release

			// Operators
			// genres
			const cleanGenres = formatters.genres(genres)

			// saving
			const release = new Release(
				undefined,
				artist_id,
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
