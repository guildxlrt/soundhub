import { ErrorHandler, GetShortReleaseDTO } from "Shared"
import { ReleasesService } from "../../services"
import { UsecaseReply } from "../../utils"
import { ReleaseTypeUsecaseParams } from "../params-adapters"

export class FindReleasesByTypeUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: ReleaseTypeUsecaseParams): Promise<UsecaseReply<GetShortReleaseDTO[]>> {
		try {
			const type = input.type
			const data = await this.mainService.findManyByReleaseType(type)

			return new UsecaseReply<GetShortReleaseDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
