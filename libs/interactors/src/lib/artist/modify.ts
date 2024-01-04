import { DatabaseServices } from "Infra-backend"
import { ModifyArtistReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { ModifyArtistParams } from "Domain"

export class ModifyArtistUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: ModifyArtistParams): Promise<ModifyArtistReplyDTO> {
		return await this.service.artist.modify(input)
	}
}
