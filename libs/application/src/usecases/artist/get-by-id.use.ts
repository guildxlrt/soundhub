import { UsecaseReply } from "../../utils"
import { ErrorHandler, GetArtistDTO } from "Shared"
import { ArtistsService } from "../../services"
import { IDUsecaseParams } from "../params-adapters"

export class GetArtistByIDUsecase {
	mainService: ArtistsService
	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetArtistDTO>> {
		try {
			const id = input.id
			const data = await this.mainService.getByID(id)

			return new UsecaseReply<GetArtistDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
