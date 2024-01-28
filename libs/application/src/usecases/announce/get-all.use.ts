import { GetAllAnnouncesReplyDTO, ErrorMsg } from "Shared"
import { AnnouncesService } from "../../services"

export class GetAllAnnouncesUsecase {
	releasesService: AnnouncesService
	constructor(releasesService: AnnouncesService) {
		this.releasesService = releasesService
	}
	async execute(): Promise<GetAllAnnouncesReplyDTO> {
		try {
			return await this.releasesService.getAll()
		} catch (error) {
			return new GetAllAnnouncesReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
