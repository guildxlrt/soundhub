import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetAllArtistsReplyDTO } from "Dto"

export class GetAllArtistsUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllArtistsReplyDTO> {
		return await this.services.artists.getAll()
	}
}
