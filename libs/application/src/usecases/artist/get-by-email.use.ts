import { ErrorHandler, GetArtistDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { ArtistsService } from "../../services"
import { EmailUsecaseParams } from "../../adapters"

export class GetArtistByEmailUsecase {
	mainService: ArtistsService
	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(input: EmailUsecaseParams): Promise<UsecaseReply<GetArtistDTO>> {
		try {
			const { email } = input

			const data = await this.mainService.getByEmail(email)

			return new UsecaseReply<GetArtistDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
