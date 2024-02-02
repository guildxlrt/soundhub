import { IDUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorHandler } from "Shared"
import { ReleasesService } from "../../services"
import { ReleaseShortDTO } from "Shared"

export class FindReleasesByArtistUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<ReleaseShortDTO[]>> {
		try {
			const id = input.id
			const data = await this.mainService.findManyByArtist(id)
			return new UsecaseReply<ReleaseShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
