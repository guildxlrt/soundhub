import { UsecaseReply } from "../../utils"
import { ErrorHandler } from "Shared"
import { RecordArtistService } from "../../services"
import { GetShortRecordDTO } from "Shared"

export class SearchRecordArtistUsecase {
	mainService: RecordArtistService
	constructor(mainService: RecordArtistService) {
		this.mainService = mainService
	}
	async execute(artistID: number): Promise<UsecaseReply<GetShortRecordDTO[]>> {
		try {
			const data = await this.mainService.search(artistID)
			return new UsecaseReply<GetShortRecordDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
