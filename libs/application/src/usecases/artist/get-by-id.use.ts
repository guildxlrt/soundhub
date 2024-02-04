import { UsecaseReply } from "../../utils"
import { ErrorHandler, ArtistShortDTO } from "Shared"
import { ArtistsService } from "../../services"
import { IDUsecaseParams } from "../params-adapters"

export class GetArtistByIDUsecase {
	mainService: ArtistsService
	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<ArtistShortDTO>> {
		try {
			const id = input.id
			const data = await this.mainService.getByID(id)

			return new UsecaseReply<ArtistShortDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
