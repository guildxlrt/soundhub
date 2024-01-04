import { DatabaseServices } from "Infra-backend"
import { ModifyArtistReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { ModifyArtistParams } from "Domain"

export class ModifyArtistUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: ModifyArtistParams): Promise<ModifyArtistReplyDTO> {
		return await this.services.artists.modify(inputs)
	}
}
