import { UsecaseReply } from "../../utils"
import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { ReleasesService } from "../../services"
import { PatchDeleteUsecaseParams } from "../../adapters"

export class PublishReleaseUsecase {
	private mainService: ReleasesService

	constructor(mainService: ReleasesService) {
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

	async frontend(input: PatchDeleteUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			const res = await this.mainService.publish(id)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: PatchDeleteUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id, ownerID } = input

			// publisher verification
			const releaseOwner = await this.mainService.getOwner(id as number)
			if (ownerID !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			// release
			await this.mainService.publish(id)

			return new UsecaseReply<boolean>(true, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
