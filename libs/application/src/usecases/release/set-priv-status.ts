import { Reply, SetPrivStatusReleaseUsecaseParams } from "../../assets"
import { ErrorMsg, envs, htmlError, ErrorHandler } from "Shared"
import { ReleasesService } from "../../services"

export class SetPrivStatusReleaseUsecase {
	releasesService: ReleasesService

	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(input: SetPrivStatusReleaseUsecaseParams): Promise<Reply<boolean>> {
		try {
			const backend = envs.backend

			if (backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(input: SetPrivStatusReleaseUsecaseParams): Promise<Reply<boolean>> {
		try {
			const { id, isPublic, ownerID } = input

			// owner verification
			const releaseOwner = await this.releasesService.getOwner(id as number)
			if (ownerID !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			const res = await this.releasesService.setPrivStatus(id, isPublic)
			return new Reply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: SetPrivStatusReleaseUsecaseParams): Promise<Reply<boolean>> {
		try {
			const { id, isPublic } = input

			const res = await this.releasesService.setPrivStatus(id, isPublic)
			return new Reply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
