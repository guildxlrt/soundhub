import { ErrorHandler, GetShortLabelDTO } from "Shared"
import { LabelsService } from "../../services"
import { UsecaseReply } from "../../utils"

export class GetAllLabelsUsecase {
	mainService: LabelsService
	constructor(mainService: LabelsService) {
		this.mainService = mainService
	}

	async execute(): Promise<UsecaseReply<GetShortLabelDTO[]>> {
		try {
			const data = (await this.mainService.getAll()) as GetShortLabelDTO[]
			return new UsecaseReply<GetShortLabelDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
