import { ErrorHandler, GetShortRecordDTO } from "Shared"
import { RecordsService } from "../../services"
import { UsecaseReply } from "../../utils"

export class GetAllRecordsUsecase {
	mainService: RecordsService
	constructor(mainService: RecordsService) {
		this.mainService = mainService
	}

	async execute(): Promise<UsecaseReply<GetShortRecordDTO[]>> {
		try {
			const data = await this.mainService.getAll()
			return new UsecaseReply<GetShortRecordDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
