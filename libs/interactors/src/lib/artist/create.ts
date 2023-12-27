import { DatabaseServices } from "Infra-backend"
import { CreateArtistInputDTO, CreateArtistReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"

export class CreateArtistUsecase extends BaseUsecase<CreateArtistInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: CreateArtistInputDTO): Promise<CreateArtistReplyDTO> {
		return await this.service.artist.create(input)
	}
}
