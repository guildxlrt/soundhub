import { IDUsecaseParams } from "../../assets"
import { ErrorHandler, FindReleasesByArtistReplyDTO } from "Shared"
import { ReleasesService } from "../../services"

export class FindReleasesByArtistUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}
	async execute(input: IDUsecaseParams): Promise<FindReleasesByArtistReplyDTO> {
		try {
			const id = input.id
			const data = await this.releasesService.findManyByArtist(id)
			return new FindReleasesByArtistReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
