import { DatabaseServices } from "Infra-backend"
import { GetSongReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { IdParams } from "Domain"

export class GetSongUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<GetSongReplyDTO> {
		return await this.services.songs.get(inputs)
	}
}
