import { DatabaseServices } from "Infra-backend"
import { CreateArtistReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { NewArtistParams } from "Domain"

export class CreateArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: NewArtistParams): Promise<CreateArtistReplyDTO> {
		return await this.services.artists.create(inputs)
	}
}
