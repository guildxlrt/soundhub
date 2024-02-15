import { GetAnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"
import { UsecaseReply } from "../../utils"

export class GetAllAnnouncesUsecase {
	mainService: AnnouncesService
	constructor(mainService: AnnouncesService) {
		this.mainService = mainService
	}
	async execute(): Promise<UsecaseReply<GetAnnounceShortDTO[]>> {
		try {
			const data = await this.mainService.getAll()

			return new UsecaseReply<GetAnnounceShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
