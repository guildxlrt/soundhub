import { UsecaseLayer, RepositoriesType, IDUsecaseParams } from "../../assets"
import { FindReleasesByArtistReplyDTO, ErrorMsg } from "Shared"

export class FindReleasesByArtistUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: IDUsecaseParams): Promise<FindReleasesByArtistReplyDTO> {
		try {
			const id = input.id
			return await this.services.releases.findManyByArtist(id)
		} catch (error) {
			return new FindReleasesByArtistReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
