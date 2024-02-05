import { GetArtistShortDTO, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"
import { UsecaseReply } from "../../utils"

export class GetAllArtistsUsecase {
	mainService: ArtistsService
	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(): Promise<UsecaseReply<GetArtistShortDTO[]>> {
		try {
			const data = await this.mainService.getAll()

			return new UsecaseReply<GetArtistShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
