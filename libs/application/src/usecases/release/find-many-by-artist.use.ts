import { IDUsecaseParams } from "../../assets"
import { FindReleasesByArtistReplyDTO, ErrorMsg } from "Shared"
import { ReleasesService } from "../../services"

export class FindReleasesByArtistUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}
	async execute(input: IDUsecaseParams): Promise<FindReleasesByArtistReplyDTO> {
		try {
			const id = input.id
			return await this.releasesService.findManyByArtist(id)
		} catch (error) {
			return new FindReleasesByArtistReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
