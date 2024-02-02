import { ErrorHandler, ReleaseShortDTO } from "Shared"
import { ReleasesService } from "../../services"
import { UsecaseReply } from "../../utils"

export class GetAllReleasesUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(): Promise<UsecaseReply<ReleaseShortDTO[]>> {
		try {
			const data = await this.mainService.getAll()
			return new UsecaseReply<ReleaseShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
