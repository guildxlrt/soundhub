import { UsecaseReply } from "../../utils"
import { ErrorHandler, ILabelName } from "Shared"
import { IDUsecaseParams } from "../../adapters"
import { RecordLabelService } from "../../services/record-label.service"

export class GetLabelOfRecordUsecase {
	mainService: RecordLabelService

	constructor(mainService: RecordLabelService) {
		this.mainService = mainService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<ILabelName>> {
		try {
			const id = input.id
			const data = await this.mainService.getLabelOfRecord(id)
			return new UsecaseReply<ILabelName>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
