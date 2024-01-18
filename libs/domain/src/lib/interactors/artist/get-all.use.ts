import { UsecaseLayer, ServicesType } from "../../../assets"
import { GetAllArtistsReplyDTO, ErrorMsg } from "Shared"

export class GetAllArtistsUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(): Promise<GetAllArtistsReplyDTO> {
		try {
			return await this.services.artists.getAll()
		} catch (error) {
			return new GetAllArtistsReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
