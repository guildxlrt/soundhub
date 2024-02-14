import { UsecaseReply } from "../../utils"
import { ErrorHandler } from "Shared"
import { RecordArtistService } from "../../services"
import { GetShortRecordDTO } from "Shared"
import { IDUsecaseParams } from "../../adapters"

export class FindRecordsByArtistUsecase {
	mainService: RecordArtistService
	constructor(mainService: RecordArtistService) {
		this.mainService = mainService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetShortRecordDTO[]>> {
		try {
			const id = input.id
			const data = await this.mainService.findRecordsByArtist(id)
			return new UsecaseReply<GetShortRecordDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
