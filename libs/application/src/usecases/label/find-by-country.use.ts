import { UsecaseReply } from "../../utils"
import { GetShortLabelDTO, ErrorHandler } from "Shared"
import { LabelsService } from "../../services"
import { CountryUsecaseParams } from "../../adapters"

export class FindLabelsByCountryUsecase {
	mainService: LabelsService
	constructor(mainService: LabelsService) {
		this.mainService = mainService
	}

	async execute(input: CountryUsecaseParams): Promise<UsecaseReply<GetShortLabelDTO[]>> {
		try {
			const country = input.country

			const data = (await this.mainService.findByCountry(country)) as GetShortLabelDTO[]
			return new UsecaseReply<GetShortLabelDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
