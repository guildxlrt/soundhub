import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { GetArtistByIdReplyDTO } from "Dto"
import { FetchByIdParams } from "Domain"

export class GetArtistByIdUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: FetchByIdParams): Promise<GetArtistByIdReplyDTO> {
		return await this.service.artist.getById(id)
	}
}
