import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { GetAllArtistsReplyDTO } from "Dto"

export class GetAllArtistsUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllArtistsReplyDTO> {
		return await this.service.artist.getAll()
	}
}
