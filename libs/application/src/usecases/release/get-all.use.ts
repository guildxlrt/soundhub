import { ErrorHandler, GetShortReleaseDTO } from "Shared"
import { ReleasesService } from "../../services"
import { UsecaseReply } from "../../utils"

export class GetAllReleasesUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(): Promise<UsecaseReply<GetShortReleaseDTO[]>> {
		try {
			const data = await this.mainService.getAll()
			return new UsecaseReply<GetShortReleaseDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
