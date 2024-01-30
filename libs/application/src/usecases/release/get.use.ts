import { IDParamsAdapter, Reply } from "../../assets"
import { ErrorHandler, ReleaseDTO } from "Shared"
import { ReleasesService } from "../../services"

export class GetReleaseUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(input: IDParamsAdapter): Promise<Reply<ReleaseDTO>> {
		try {
			const id = input.id
			const data = await this.releasesService.get(id)
			return new Reply<ReleaseDTO>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
