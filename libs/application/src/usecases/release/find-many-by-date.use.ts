import { ErrorHandler, ReleaseShortDTO } from "Shared"
import { ReleasesService } from "../../services"
import { Reply } from "../../assets"

export class FindReleasesByDateUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(input: { date: Date }): Promise<Reply<ReleaseShortDTO[]>> {
		try {
			const date = input.date
			const data = await this.releasesService.findManyByDate(date)

			return new Reply<ReleaseShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
