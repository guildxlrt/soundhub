import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindReleasesByArtistDTO } from "Dto"

export class FindReleasesByArtistUsecase extends BaseUsecase<FindReleasesByArtistDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: FindReleasesByArtistDTO): Promise<FindReleasesByArtistDTO> {
		return await this.service.release.findManyByArtist(inputs)
	}
}
