import { ErrorHandler, GetShortRecordDTO } from "Shared"
import { RecordsService } from "../../services"
import { UsecaseReply } from "../../utils"
import { DateUsecaseParams } from "../../adapters"
import { DateFormatter } from "Domain"

export class FindRecordsByDateUsecase {
	mainService: RecordsService
	constructor(mainService: RecordsService) {
		this.mainService = mainService
	}

	async execute(input: DateUsecaseParams): Promise<UsecaseReply<GetShortRecordDTO[]>> {
		try {
			const { date } = input

			const dateFormatter = new DateFormatter()
			const cleanDate = dateFormatter.format(date)
			const data = await this.mainService.findByDate(cleanDate)

			return new UsecaseReply<GetShortRecordDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
