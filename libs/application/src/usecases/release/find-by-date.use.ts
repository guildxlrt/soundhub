import { ErrorHandler, GetShortReleaseDTO } from "Shared"
import { ReleasesService } from "../../services"
import { UsecaseReply } from "../../utils"
import { DateUsecaseParams } from "../../adapters"
import { DateFormatter } from "Domain"

export class FindReleasesByDateUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: DateUsecaseParams): Promise<UsecaseReply<GetShortReleaseDTO[]>> {
		try {
			const { date } = input

			const dateFormatter = new DateFormatter()
			const cleanDate = dateFormatter.format(date)
			const data = await this.mainService.findByDate(cleanDate)

			return new UsecaseReply<GetShortReleaseDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
