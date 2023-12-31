import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetAllArtistsReplyDTO } from "Dto"
import { ErrorMsg } from "Shared-utils"

export class GetAllArtistsUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
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
