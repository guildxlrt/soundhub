import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetArtistByIdInputDTO, GetArtistByIdReplyDTO, ErrorMsg } from "Shared"
import { IdParams } from "Shared"

export class GetArtistByIdUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: GetArtistByIdInputDTO): Promise<GetArtistByIdReplyDTO> {
		try {
			return await this.services.artists.getById(new IdParams(inputs.id))
		} catch (error) {
			return new GetArtistByIdReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
