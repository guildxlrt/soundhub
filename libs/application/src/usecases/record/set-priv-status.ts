import { UsecaseReply } from "../../utils"
import { ErrorMsg, envs, htmlError, ErrorHandler } from "Shared"
import { RecordsService } from "../../services"
import { SetStatusRecordUsecaseParams } from "../../adapters"

export class SetStatusRecordUsecase {
	mainService: RecordsService

	constructor(mainService: RecordsService) {
		this.mainService = mainService
	}

	async execute(input: SetStatusRecordUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: SetStatusRecordUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id, authID, status } = input

			// auth verification
			const checkRights = await this.mainService.checkRights(id as number, authID as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			const res = await this.mainService.setStatus(id, status)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: SetStatusRecordUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id, status } = input

			const res = await this.mainService.setStatus(id, status)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
