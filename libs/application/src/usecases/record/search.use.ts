import { ErrorHandler, GenreType, GetShortRecordDTO, RecordType } from "Shared"
import { RecordsService } from "../../services"
import { UsecaseReply } from "../../utils"

export class SearchRecordsUsecase {
	mainService: RecordsService
	constructor(mainService: RecordsService) {
		this.mainService = mainService
	}

	async execute(
		genre: GenreType,
		date: Date,
		type: RecordType
	): Promise<UsecaseReply<GetShortRecordDTO[]>> {
		try {
			const data = await this.mainService.search(genre, date, type)
			return new UsecaseReply<GetShortRecordDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
