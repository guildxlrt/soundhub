import { ErrorHandler, ReleaseShortDTO } from "Shared"
import { ReleasesService } from "../../services"
import { Reply } from "../../assets"

export class GetAllReleasesUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(): Promise<Reply<ReleaseShortDTO[]>> {
		try {
			const data = await this.releasesService.getAll()
			return new Reply<ReleaseShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
