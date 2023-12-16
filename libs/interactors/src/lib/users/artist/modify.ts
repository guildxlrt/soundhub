import { DatabaseServices } from "Infra-backend"
import { ModifyArtistDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class ModifyArtistUsecase extends BaseUsecase<ModifyArtistDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(params: ModifyArtistDTO): Promise<ModifyArtistDTO> {
		return await this.service.artist.modify(params)
	}
}
