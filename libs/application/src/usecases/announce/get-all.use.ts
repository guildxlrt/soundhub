import { GetAnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"
import { UsecaseReply } from "../../utils"

export class GetAllAnnouncesUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}
	async execute(): Promise<UsecaseReply<GetAnnounceShortDTO[]>> {
		try {
			const data = await this.announcesService.getAll()

			return new UsecaseReply<GetAnnounceShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
