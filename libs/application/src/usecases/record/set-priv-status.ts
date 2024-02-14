import { UsecaseReply } from "../../utils"
import { ErrorMsg, envs, htmlError, ErrorHandler } from "Shared"
import { RecordsService } from "../../services"
import { PatchDeleteUsecaseParams } from "../../adapters"

export class SetPublicStatusRecordUsecase {
	mainService: RecordsService

	constructor(mainService: RecordsService) {
		this.mainService = mainService
	}

	async execute(input: PatchDeleteUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: PatchDeleteUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id, ownerID } = input

			// publisher verification
			const recordOwner = await this.mainService.getOwner(id as number)
			if (ownerID !== recordOwner) throw ErrorMsg.htmlError(htmlError[403])

			// get status
			const isPublic = await this.mainService.getPublicStatus(id)

			// persist
			const res = await this.mainService.setPublicStatus(id, isPublic)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: PatchDeleteUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			const res = await this.mainService.setPublicStatus(id)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
