import { GetAnnounceReplyDTO, ErrorMsg } from "Shared"
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

			return await this.releasesService.get(id)
		} catch (error) {
			return new GetAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
