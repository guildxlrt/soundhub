import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { GetAllArtistsReplyDTO, ErrorMsg } from "Shared"

export class GetAllArtistsUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
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
