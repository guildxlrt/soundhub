import { UsecaseReply, SetPrivStatusReleaseUsecaseParams } from "../../utils"
import { ErrorMsg, envs, htmlError, ErrorHandler } from "Shared"
import { ReleasesService } from "../../services"

export class SetPrivStatusReleaseUsecase {
	mainService: ReleasesService

	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: SetPrivStatusReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(input: SetPrivStatusReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id, ownerID } = input

			// owner verification
			const releaseOwner = await this.mainService.getOwner(id as number)
			if (ownerID !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// get status
			const isPublic = await this.mainService.getPrivStatus(id)

			// persist
			const res = await this.mainService.setPrivStatus(id, isPublic)
			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: SetPrivStatusReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			const res = await this.mainService.setPrivStatus(id)
			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
