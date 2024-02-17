import { GetAnnounceShortDTO, ErrorHandler, ArtistProfileID } from "Shared"
import { AnnouncesService } from "../../services"
import { UsecaseReply } from "../../utils"

export class SearchAnnouncesUsecase {
	mainService: AnnouncesService
	constructor(mainService: AnnouncesService) {
		this.mainService = mainService
	}
	async execute(id: ArtistProfileID, date: Date): Promise<UsecaseReply<GetAnnounceShortDTO[]>> {
		try {
			const data = await this.mainService.search(id, date)

			return new UsecaseReply<GetAnnounceShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
