import { ErrorHandler, ErrorMsg, filePath, htmlError } from "Shared"
import { Reply, UpdateArtistParamsAdapter } from "../../assets"
import { Artist, File } from "Domain"
import { ArtistsService, StorageService } from "../../services"

export class UpdateArtistUsecase {
	artistsService: ArtistsService
	storageService?: StorageService

	constructor(artistsService: ArtistsService, storageService?: StorageService) {
		this.artistsService = artistsService
		this.storageService = storageService
	}

	async execute(input: UpdateArtistParamsAdapter): Promise<Reply<boolean>> {
		try {
			const { profile, delAvatar, file } = input
			if (this.storageService) return await this.backend(this.storageService, input)
			else return await this.frontend(profile, delAvatar, file)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(artist: Artist, delAvatar?: boolean, file?: File): Promise<Reply<boolean>> {
		try {
			const data = await this.artistsService.update(artist, delAvatar, file)
			return new Reply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		input: UpdateArtistParamsAdapter
	): Promise<Reply<boolean>> {
		try {
			const { user_auth_id, id } = input.profile
			const { file, profile, delAvatar } = input

			// owner verification
			const userAuths = await this.artistsService.getAuths(user_auth_id as number)
			if (
				(id as number) !== (userAuths.id as number) ||
				(user_auth_id as number) !== (userAuths.user_auth_id as number)
			)
				throw ErrorMsg.htmlError(htmlError[403])

			// persist
			await this.artistsService.update(profile)

			// STORING NEW FILE
			// contradiction
			if (file && delAvatar === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			if (file || delAvatar === true) {
				const oldImagePath = await this.artistsService.getAvatarPath(id as number)
				if (!oldImagePath) throw new ErrorMsg(`Error: failed to store`)

				if (file) {
					// move new
					const newImagePath = await storageService.move(file, filePath.store.artist)

					// persist path
					await this.artistsService.setAvatarPath(newImagePath, id as number)
				}

				// delete old
				await storageService.delete(oldImagePath as string)
			}

			return new Reply<boolean>(true)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
