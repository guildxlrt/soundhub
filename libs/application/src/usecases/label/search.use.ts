import { ErrorHandler, GetShortLabelDTO } from "Shared"
import { LabelsService } from "../../services"
import { UsecaseReply } from "../../utils"

export class SearchLabelsUsecase {
	mainService: LabelsService
	constructor(mainService: LabelsService) {
		this.mainService = mainService
	}

	async execute(country: string): Promise<UsecaseReply<GetShortLabelDTO[]>> {
		try {
			const data = (await this.mainService.search(country)) as GetShortLabelDTO[]
			return new UsecaseReply<GetShortLabelDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
