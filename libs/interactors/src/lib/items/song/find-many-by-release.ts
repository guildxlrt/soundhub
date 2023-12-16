import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindSongsByReleaseDTO } from "Dto"

export class FindSongsByReleaseUsecase extends BaseUsecase<FindSongsByReleaseDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: FindSongsByReleaseDTO): Promise<FindSongsByReleaseDTO> {
		return await this.service.song.findManyByRelease(id)
	}
}
