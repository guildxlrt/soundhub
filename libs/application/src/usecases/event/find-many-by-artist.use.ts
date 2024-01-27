import { UsecaseLayer, RepositoriesType, IDUsecaseParams } from "../../assets"
import { FindEventsByArtistReplyDTO, ErrorMsg } from "Shared"

export class FindEventsByArtistUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: IDUsecaseParams): Promise<FindEventsByArtistReplyDTO> {
		try {
			const id = input.id
			return await this.services.events.findManyByArtist(id)
		} catch (error) {
			return new FindEventsByArtistReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
