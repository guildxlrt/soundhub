import { IDUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorHandler } from "Shared"
import { ReleasesService } from "../../services"
import { GetShortReleaseDTO } from "Shared"

export class FindReleasesByArtistUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetShortReleaseDTO[]>> {
		try {
			const id = input.id
			const data = await this.mainService.findManyByArtist(id)
			return new UsecaseReply<GetShortReleaseDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
