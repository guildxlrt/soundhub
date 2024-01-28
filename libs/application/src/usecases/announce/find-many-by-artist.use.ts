import { IDUsecaseParams } from "../../assets"
import { FindAnnouncesByArtistReplyDTO, ErrorMsg } from "Shared"
import { AnnouncesService } from "../../services"

export class FindAnnouncesByArtistUsecase {
	releasesService: AnnouncesService
	constructor(releasesService: AnnouncesService) {
		this.releasesService = releasesService
	}
	async execute(input: IDUsecaseParams): Promise<FindAnnouncesByArtistReplyDTO> {
		try {
			const id = input.id

			return await this.releasesService.findManyByArtist(id)
		} catch (error) {
			return new FindAnnouncesByArtistReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
