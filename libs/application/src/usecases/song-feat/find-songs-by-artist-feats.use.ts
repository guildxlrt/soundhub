import { UsecaseReply } from "../../utils"
import { ErrorHandler } from "Shared"
import { SongFeatService } from "../../services"
import { GetShortRecordDTO } from "Shared"
import { IDUsecaseParams } from "../../adapters"

export class FindSongsByArtistFeatsUsecase {
	mainService: SongFeatService

	constructor(mainService: SongFeatService) {
		this.mainService = mainService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetShortRecordDTO[]>> {
		try {
			const id = input.id
			const data = await this.mainService.findSongsByArtistFeats(id)
			return new UsecaseReply<GetShortRecordDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
