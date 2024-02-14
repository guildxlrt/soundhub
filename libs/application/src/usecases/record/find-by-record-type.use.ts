import { ErrorHandler, GetShortRecordDTO, RecordType } from "Shared"
import { RecordsService } from "../../services"
import { UsecaseReply } from "../../utils"
import { RecordTypeUsecaseParams } from "../../adapters"

export class FindRecordsByTypeUsecase {
	mainService: RecordsService
	constructor(mainService: RecordsService) {
		this.mainService = mainService
	}

	async execute(input: RecordTypeUsecaseParams): Promise<UsecaseReply<GetShortRecordDTO[]>> {
		try {
			const type = input.type
			const data = await this.mainService.findByRecordType(type as RecordType)

			return new UsecaseReply<GetShortRecordDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
