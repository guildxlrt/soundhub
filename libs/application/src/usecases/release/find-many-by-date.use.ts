import { ErrorHandler, ReleaseShortDTO } from "Shared"
import { ReleasesService } from "../../services"
import { UsecaseReply } from "../../utils"

export class FindReleasesByDateUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: { date: Date }): Promise<UsecaseReply<ReleaseShortDTO[]>> {
		try {
			const date = input.date
			const data = await this.mainService.findManyByDate(date)

			return new UsecaseReply<ReleaseShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
