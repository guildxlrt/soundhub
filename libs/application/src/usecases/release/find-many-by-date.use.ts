import { ErrorHandler, GetShortReleaseDTO } from "Shared"
import { ReleasesService } from "../../services"
import { UsecaseReply } from "../../utils"
import { DateUsecaseParams } from "../params-adapters"

export class FindReleasesByDateUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: DateUsecaseParams): Promise<UsecaseReply<GetShortReleaseDTO[]>> {
		try {
			const date = input.date
			const data = await this.mainService.findManyByDate(date)

			return new UsecaseReply<GetShortReleaseDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
