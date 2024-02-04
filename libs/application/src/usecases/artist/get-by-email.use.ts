import { ErrorHandler, ArtistShortDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { ArtistsService } from "../../services"
import { EmailUsecaseParams } from "../params-adapters"

export class GetArtistByEmailUsecase {
	mainService: ArtistsService
	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(input: EmailUsecaseParams): Promise<UsecaseReply<ArtistShortDTO>> {
		try {
			const { email } = input

			const data = await this.mainService.getByEmail(email)

			return new UsecaseReply<ArtistShortDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
