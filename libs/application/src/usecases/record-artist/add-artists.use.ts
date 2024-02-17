import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { RecordArtistService } from "../../services"
import { UsecaseReply } from "../../utils"
import { RecordArtistUsecaseParams } from "../../adapters"

//
export class AddArtistsToRecordUsecase {
	mainService: RecordArtistService

	constructor(mainService: RecordArtistService) {
		this.mainService = mainService
	}

	async execute(input: RecordArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: RecordArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const data = await this.mainService.addArtists(input)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: RecordArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { record, authID } = input

			// auths verification
			const checkRights = await this.mainService.checkRights(record, authID as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			const data = await this.mainService.addArtists(input)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
