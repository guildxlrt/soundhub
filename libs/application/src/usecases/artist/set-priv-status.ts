import { UsecaseReply } from "../../utils"
import { envs, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"
import { SetPublicStatusArtistUsecaseParams } from "../params-adapters"

export class SetPublicStatusArtistUsecase {
	mainService: ArtistsService

	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(input: SetPublicStatusArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: SetPublicStatusArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			// get status
			const isPublic = await this.mainService.getPublicStatus(id as number)

			// persist
			const res = await this.mainService.setPublicStatus(id, isPublic)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(): Promise<UsecaseReply<boolean>> {
		try {
			const res = await this.mainService.setPublicStatus()
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
