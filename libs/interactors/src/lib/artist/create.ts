import { DatabaseServices } from "Infra-backend"
import { CreateArtistReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { NewArtistParams } from "Domain"

export class CreateArtistUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: NewArtistParams): Promise<CreateArtistReplyDTO> {
		return await this.service.artist.create(input)
	}
}
