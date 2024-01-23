import { UsecaseLayer, ServicesType } from "../../../assets"
import { FindReleasesByGenreReplyDTO, ErrorMsg } from "Shared"
import { GenreType } from "Shared"

export class FindReleasesByGenreUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {		super(services, backend)
	}

	async execute(inputs: { genre: GenreType }): Promise<FindReleasesByGenreReplyDTO> {
		try {
			const genre = inputs.genre
			return await this.services.releases.findManyByGenre(genre)
		} catch (error) {
			return new FindReleasesByGenreReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
