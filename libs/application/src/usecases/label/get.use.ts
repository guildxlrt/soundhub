import { ErrorHandler, GetFullLabelDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { LabelsService } from "../../services"
import { IDUsecaseParams } from "../../adapters"

export class GetLabelUsecase {
	mainService: LabelsService
	constructor(mainService: LabelsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetFullLabelDTO>> {
		try {
			const id = input.id

			const data = (await this.mainService.get(id)) as GetFullLabelDTO
			return new UsecaseReply<GetFullLabelDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
