import { UsecaseReply } from "../../utils"
import { envs, ErrorHandler, ErrorMsg, htmlError } from "Shared"
import { ArtistsService } from "../../services"
import { SetStatusArtistUsecaseParams } from "../../adapters"

export class SetStatusArtistUsecase {
	mainService: ArtistsService

	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(input: SetStatusArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: SetStatusArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { artistProfileID, authID, status } = input

			// auth verification
			const checkRights = await this.mainService.checkRights(
				artistProfileID as number,
				authID as number
			)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			const res = await this.mainService.setStatus(artistProfileID, status)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: SetStatusArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { artistProfileID, status } = input

			const res = await this.mainService.setStatus(artistProfileID, status)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
