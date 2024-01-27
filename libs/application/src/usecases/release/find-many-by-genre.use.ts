import { UsecaseLayer, RepositoriesType } from "../../assets"
import { FindReleasesByGenreReplyDTO, ErrorMsg } from "Shared"
import { GenreType } from "Shared"

export class FindReleasesByGenreUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: { genre: GenreType }): Promise<FindReleasesByGenreReplyDTO> {
		try {
			const genre = input.genre
			return await this.services.releases.findManyByGenre(genre)
		} catch (error) {
			return new FindReleasesByGenreReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
