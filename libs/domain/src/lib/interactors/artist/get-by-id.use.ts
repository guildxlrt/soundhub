import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"
import { GetArtistByIDReplyDTO, ErrorMsg } from "Shared"

export class GetArtistByIDUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: IDUsecaseParams): Promise<GetArtistByIDReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.artists.getByID(id)
		} catch (error) {
			return new GetArtistByIDReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
