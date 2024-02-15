import { ErrorHandler, GetAnnounceShortDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { AnnouncesService } from "../../services"
import { IDUsecaseParams } from "../../adapters"

export class GetAnnounceUsecase {
	mainService: AnnouncesService
	constructor(mainService: AnnouncesService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetAnnounceShortDTO>> {
		try {
			const id = input.id

			const data = await this.mainService.get(id)
			return new UsecaseReply<GetAnnounceShortDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
