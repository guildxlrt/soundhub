import { ErrorHandler, GetShortReleaseDTO, ReleaseType } from "Shared"
import { ReleasesService } from "../../services"
import { UsecaseReply } from "../../utils"

export class FindReleasesByTypeUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: { type: ReleaseType }): Promise<UsecaseReply<GetShortReleaseDTO[]>> {
		try {
			const type = input.type
			const data = await this.mainService.findManyByReleaseType(type)

			return new UsecaseReply<GetShortReleaseDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
