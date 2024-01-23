import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"
import { FindEventsByArtistReplyDTO, ErrorMsg } from "Shared"

export class FindEventsByArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: IDUsecaseParams): Promise<FindEventsByArtistReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.events.findManyByArtist(id)
		} catch (error) {
			return new FindEventsByArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
