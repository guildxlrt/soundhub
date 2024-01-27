import { UsecaseLayer, RepositoriesType, IDUsecaseParams } from "../../assets"
import { FindAnnouncesByArtistReplyDTO, ErrorMsg } from "Shared"

export class FindAnnouncesByArtistUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: IDUsecaseParams): Promise<FindAnnouncesByArtistReplyDTO> {
		try {
			const id = input.id

			return await this.services.announces.findManyByArtist(id)
		} catch (error) {
			return new FindAnnouncesByArtistReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
