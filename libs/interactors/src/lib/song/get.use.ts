import { DatabaseServices } from "Infra-backend"
import { GetSongReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Domain"

export class GetSongUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<GetSongReplyDTO> {
		return await this.services.songs.get(inputs)
	}
}