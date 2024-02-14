import { UsecaseReply } from "../../utils"
import { ErrorHandler } from "Shared"
import { ReleaseArtistService } from "../../services"
import { GetShortReleaseDTO } from "Shared"
import { IDUsecaseParams } from "../../adapters"

export class FindReleasesByArtistUsecase {
	mainService: ReleaseArtistService
	constructor(mainService: ReleaseArtistService) {
		this.mainService = mainService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetShortReleaseDTO[]>> {
		try {
			const id = input.id
			const data = await this.mainService.findReleasesByArtist(id)
			return new UsecaseReply<GetShortReleaseDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
