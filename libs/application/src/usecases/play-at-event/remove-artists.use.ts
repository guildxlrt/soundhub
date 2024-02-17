import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { PlayAtEventService } from "../../services"
import { UsecaseReply } from "../../utils"
import { PlayAtEventUsecaseParams } from "../../adapters"

//
export class RemoveArtistsToEventUsecase {
	mainService: PlayAtEventService

	constructor(mainService: PlayAtEventService) {
		this.mainService = mainService
	}

	async execute(input: PlayAtEventUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: PlayAtEventUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const data = await this.mainService.removeArtists(input)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: PlayAtEventUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { event, authID } = input

			// auths verification
			const checkRights = await this.mainService.checkRights(event, authID as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			const data = await this.mainService.removeArtists(input)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
