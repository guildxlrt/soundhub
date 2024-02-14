import { UsecaseReply } from "../../utils"
import { ErrorHandler } from "Shared"
import { SongFeatService } from "../../services"
import { GetShortReleaseDTO } from "Shared"
import { IDUsecaseParams } from "../../adapters"

export class FindSongsByArtistFeatsUsecase {
	mainService: SongFeatService

	constructor(mainService: SongFeatService) {
		this.mainService = mainService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetShortReleaseDTO[]>> {
		try {
			const id = input.id
			const data = await this.mainService.findSongsByArtistFeats(id)
			return new UsecaseReply<GetShortReleaseDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
