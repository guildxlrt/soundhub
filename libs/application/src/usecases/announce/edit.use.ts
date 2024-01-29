import { EditAnnounceReplyDTO, ErrorHandler, ErrorMsg, filePath, htmlError } from "Shared"
import { AnnounceUsecaseParams } from "../../assets"
import { Announce, File, StorageRepository } from "Domain"
import { AnnouncesService } from "../../services"

export class EditAnnounceUsecase {
	private announcesService: AnnouncesService
	private storageRepository?: StorageRepository

	constructor(announcesService: AnnouncesService, storageRepository?: StorageRepository) {
		this.announcesService = announcesService
		this.storageRepository = storageRepository
	}

	async execute(input: AnnounceUsecaseParams): Promise<EditAnnounceReplyDTO> {
		try {
			const { file } = input
			const { owner_id, title, text, id } = input.data
			const data = new Announce(id as number, owner_id as number, title, text, null)

			if (this.storageRepository)
				return await this.backend(this.storageRepository, data, file)
			else return await this.frontend(data, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(annouce: Announce, file?: File): Promise<EditAnnounceReplyDTO> {
		try {
			const data = await this.announcesService.edit(annouce, file)
			return new EditAnnounceReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		storageRepository: StorageRepository,
		announce: Announce,
		file?: File
	): Promise<EditAnnounceReplyDTO> {
		try {
			const { owner_id, id } = announce

			// owner verification
			const announceOwner = await this.announcesService.getOwner(id as number)
			if (owner_id !== announceOwner) throw ErrorMsg.htmlError(htmlError[403])

			// STORING NEW FILE
			if (file) {
				const oldImagePath = await this.announcesService.getImagePath(id as number)
				if (!oldImagePath) new ErrorMsg(`Error: failed to persist`)

				// move new
				const newImagePath = await storageRepository.move(file, filePath.store.announce)
				if (!newImagePath) throw new ErrorMsg(`Error: failed to store`)

				// persist
				announce.updateImagePath(newImagePath)
				await this.announcesService.edit(announce)

				// delete old
				await storageRepository.delete(oldImagePath as string)

				return new EditAnnounceReplyDTO(true)
			} else {
				const data = await this.announcesService.edit(announce)
				return new EditAnnounceReplyDTO(data)
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
