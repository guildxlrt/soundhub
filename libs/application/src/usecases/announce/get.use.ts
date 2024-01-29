import { GetAnnounceReplyDTO, ErrorHandler } from "Shared"
import { IDUsecaseParams } from "../../assets"
import { AnnouncesService } from "../../services"

export class GetAnnounceUsecase {
	releasesService: AnnouncesService
	constructor(releasesService: AnnouncesService) {
		this.releasesService = releasesService
	}

	async execute(input: IDUsecaseParams): Promise<GetAnnounceReplyDTO> {
		try {
			const id = input.id

			const data = await this.releasesService.get(id)
			return new GetAnnounceReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
