import { DatabaseServices } from "Infra-backend"
import { ModifyArtistInputDTO, ModifyArtistReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"

export class ModifyArtistUsecase extends BaseUsecase<ModifyArtistInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: ModifyArtistInputDTO): Promise<ModifyArtistReplyDTO> {
		return await this.service.artist.modify(input)
	}
}
