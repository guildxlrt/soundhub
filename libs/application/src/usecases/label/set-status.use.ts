import { UsecaseReply } from "../../utils"
import { envs, ErrorHandler, ErrorMsg, htmlError } from "Shared"
import { LabelsService } from "../../services"
import { SetStatusLabelUsecaseParams } from "../../adapters"

export class SetStatusLabelUsecase {
	mainService: LabelsService

	constructor(mainService: LabelsService) {
		this.mainService = mainService
	}

	async execute(input: SetStatusLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: SetStatusLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id, status } = input

			// auth verification
			const checkRights = await this.mainService.checkRights(id as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			const res = await this.mainService.setStatus({ id, status })
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: SetStatusLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id, status } = input

			const res = await this.mainService.setStatus({ id, status })
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
