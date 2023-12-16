import { DatabaseServices } from "Infra-backend"
import { GetSongDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class GetSongUsecase extends BaseUsecase<GetSongDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GetSongDTO): Promise<GetSongDTO> {
		return await this.service.song.get(inputs)
	}
}
