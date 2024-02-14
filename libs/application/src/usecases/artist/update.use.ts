import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { UsecaseReply } from "../../utils"
import { ArtistsService, StorageService } from "../../services"
import { UpdateArtistUsecaseParams } from "../../adapters"

export class UpdateArtistUsecase {
	mainService: ArtistsService
	storageService?: StorageService

	constructor(mainService: ArtistsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: UpdateArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { file, profile } = input
			// validate
			profile.sanitize()
			file?.validateImage()

			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: UpdateArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { profile, delLogo, file } = input

			const data = await this.mainService.update(profile, delLogo, file)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: UpdateArtistUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { user_auth_id, id } = input.profile
			const { file, profile, delLogo } = input

			// publisher verification
			const userAuths = await this.mainService.getAuths(user_auth_id as number)
			if (
				(id as number) !== (userAuths.id as number) ||
				(user_auth_id as number) !== (userAuths.user_auth_id as number)
			)
				throw ErrorMsg.htmlError(htmlError[403])

			// persist
			await this.mainService.update(profile)

			// STORING NEW FILE
			// contradiction
			if (file && delLogo === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			if (file || delLogo === true) {
				const oldImagePath = await this.mainService.getLogoPath(id as number)
				if (!oldImagePath) throw new ErrorMsg(`Error: failed to store`)

				if (file) {
					// move new
					const newImagePath = await storageService.move(file, filePath.store.artist)

					// persist path
					await this.mainService.setLogoPath(newImagePath, id as number)
				}

				// delete old
				await storageService.delete(oldImagePath as string)
			}

			return new UsecaseReply<boolean>(true, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
