import { SetPrivStatusReleaseUsecaseParams } from "../../assets"
import { SetPrivStatusReleaseReplyDTO, ErrorMsg, envs, htmlError } from "Shared"
import { ReleasesService } from "../../services"

export class SetPrivStatusReleaseUsecase {
	releasesService: ReleasesService

	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(input: SetPrivStatusReleaseUsecaseParams): Promise<SetPrivStatusReleaseReplyDTO> {
		try {
			const backend = envs.backend

			if (backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			return new SetPrivStatusReleaseReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}

	async backend(input: SetPrivStatusReleaseUsecaseParams) {
		try {
			const { id, isPublic, ownerID } = input

			// owner verification
			const releaseOwner = await this.releasesService.getOwner(id as number)
			if (ownerID !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			return await this.releasesService.setPrivStatus(id, isPublic)
		} catch (error) {
			return new SetPrivStatusReleaseReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}

	async frontend(input: SetPrivStatusReleaseUsecaseParams) {
		try {
			const { id, isPublic } = input

			return await this.releasesService.setPrivStatus(id, isPublic)
		} catch (error) {
			return new SetPrivStatusReleaseReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
