import { DatabaseServices } from "Infra-backend"
import { GetSongInputDTO, GetSongReplyDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class GetSongUsecase extends BaseUsecase<GetSongInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: GetSongInputDTO): Promise<GetSongReplyDTO> {
		return await this.service.song.get(input)
	}
}
