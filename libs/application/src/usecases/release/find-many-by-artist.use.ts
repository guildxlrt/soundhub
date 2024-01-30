import { IDParamsAdapter, Reply } from "../../assets"
import { ErrorHandler } from "Shared"
import { ReleasesService } from "../../services"
import { ReleaseShortDTO } from "Shared"

export class FindReleasesByArtistUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}
	async execute(input: IDParamsAdapter): Promise<Reply<ReleaseShortDTO[]>> {
		try {
			const id = input.id
			const data = await this.releasesService.findManyByArtist(id)
			return new Reply<ReleaseShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
