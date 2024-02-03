import { UsecaseReply, SetPublicStatusReleaseUsecaseParams } from "../../utils"
import { ErrorMsg, envs, htmlError, ErrorHandler } from "Shared"
import { ReleasesService } from "../../services"

export class SetPublicStatusReleaseUsecase {
	mainService: ReleasesService

	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: SetPublicStatusReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: SetPublicStatusReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id, ownerID } = input

			// owner verification
			const releaseOwner = await this.mainService.getOwner(id as number)
			if (ownerID !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// get status
			const isPublic = await this.mainService.getPublicStatus(id)

			// persist
			const res = await this.mainService.setPublicStatus(id, isPublic)
			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: SetPublicStatusReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			const res = await this.mainService.setPublicStatus(id)
			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
