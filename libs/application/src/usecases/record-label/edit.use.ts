import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { UsecaseReply } from "../../utils"
import { RecordLabelService } from "../../services/record-label.service"
import { RecordLabelUsecaseParams } from "../../adapters"

export class EditLabelToRecordUsecase {
	mainService: RecordLabelService

	constructor(mainService: RecordLabelService) {
		this.mainService = mainService
	}

	async execute(input: RecordLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: RecordLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const data = await this.mainService.edit(input)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: RecordLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { record, authID } = input

			// auths verification
			const checkRights = await this.mainService.checkRights(record, authID as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			const data = await this.mainService.edit(input)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
