import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindSongsByReleaseInputDTO, FindSongsByReleaseReplyDTO } from "Dto"

export class FindSongsByReleaseUsecase extends BaseUsecase<FindSongsByReleaseInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: FindSongsByReleaseInputDTO): Promise<FindSongsByReleaseReplyDTO> {
		return await this.service.song.findManyByRelease(id)
	}
}
