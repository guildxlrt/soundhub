import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { SongFeatService } from "../../services"
import { UsecaseReply } from "../../utils"
import { SongFeatUsecaseParams } from "../../adapters"

//
export class AddArtistsToSongUsecase {
	mainService: SongFeatService

	constructor(mainService: SongFeatService) {
		this.mainService = mainService
	}

	async execute(input: SongFeatUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: SongFeatUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const data = await this.mainService.addArtists(input)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: SongFeatUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { song, authID } = input

			// auths verification
			const checkRights = await this.mainService.checkRights(song, authID as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			const data = await this.mainService.addArtists(input)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
