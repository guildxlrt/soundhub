import { GetAllAnnouncesReplyDTO, ErrorMsg, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"

export class GetAllAnnouncesUsecase {
	releasesService: AnnouncesService
	constructor(releasesService: AnnouncesService) {
		this.releasesService = releasesService
	}
	async execute(): Promise<GetAllAnnouncesReplyDTO> {
		try {
			const data = await this.releasesService.getAll()

			return new GetAllAnnouncesReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
