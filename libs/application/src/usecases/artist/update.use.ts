import { ErrorHandler, ErrorMsg, UpdateArtistReplyDTO, filePath, htmlError } from "Shared"
import { UpdateArtistUsecaseParams } from "../../assets"
import { Artist, File, StorageRepository } from "Domain"
import { ArtistsService } from "../../services"

export class UpdateArtistUsecase {
	artistsService: ArtistsService
	storageRepository?: StorageRepository

	constructor(artistsService: ArtistsService, storageRepository?: StorageRepository) {
		this.artistsService = artistsService
		this.storageRepository = storageRepository
	}

	async execute(input: UpdateArtistUsecaseParams): Promise<UpdateArtistReplyDTO> {
		try {
			const { profile, avatarDel, file } = input
			if (this.storageRepository) return await this.backend(this.storageRepository, input)
			else return await this.frontend(profile, avatarDel, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(
		artist: Artist,
		avatarDel?: boolean,
		file?: File
	): Promise<UpdateArtistReplyDTO> {
		try {
			const data = await this.artistsService.update(artist, avatarDel, file)
			return new UpdateArtistReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		storageRepository: StorageRepository,
		input: UpdateArtistUsecaseParams
	): Promise<UpdateArtistReplyDTO> {
		try {
			const { user_auth_id, id } = input.profile
			const { file, profile, avatarDel } = input

			// owner verification
			const userAuthID = await this.artistsService.getByAuth(user_auth_id as number)
			if ((user_auth_id as number) !== (userAuthID.profile.user_auth_id as number))
				throw ErrorMsg.htmlError(htmlError[403])

			// contradiction
			if (file && avatarDel === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			// STORING NEW FILE
			if (file) {
				const oldImagePath = await this.artistsService.getAvatarPath(id as number)
				if (!oldImagePath) new ErrorMsg(`Error: failed to persist`)

				// move new
				const newImagePath = await storageRepository.move(file, filePath.store.announce)
				if (!newImagePath) throw new ErrorMsg(`Error: failed to store`)
				profile.updateAvatarPath(newImagePath)

				// persist
				await this.artistsService.update(profile)

				// delete old
				await storageRepository.delete(oldImagePath as string)

				return new UpdateArtistReplyDTO(true)
			} else {
				// No User Image
				if (avatarDel === true) profile.updateAvatarPath(null)

				// Saving
				const data = await this.artistsService.update(profile)

				return new UpdateArtistReplyDTO(data)
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
