import { IDUsecaseParams } from "../../assets"
import { FindAnnouncesByArtistReplyDTO, ErrorMsg, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"

export class FindAnnouncesByArtistUsecase {
	releasesService: AnnouncesService
	constructor(releasesService: AnnouncesService) {
		this.releasesService = releasesService
	}
	async execute(input: IDUsecaseParams): Promise<FindAnnouncesByArtistReplyDTO> {
		try {
			const id = input.id

			const data = await this.releasesService.findManyByArtist(id)
			return new FindAnnouncesByArtistReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
