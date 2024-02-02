import { IDUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorHandler, GetReleaseDTO } from "Shared"
import { ReleasesService } from "../../services"

export class GetReleaseUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetReleaseDTO>> {
		try {
			const id = input.id
			const data = await this.mainService.get(id)
			return new UsecaseReply<GetReleaseDTO>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
