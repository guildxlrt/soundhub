import { EditAnnounceReplyDTO, ErrorMsg, ReplyLayer, filePath, htmlError } from "Shared"
import { AnnounceUsecaseParams } from "../../assets"
import { Announce, File, StorageRepository } from "Domain"
import { AnnouncesService } from "../../services"

export class EditAnnounceUsecase {
	announcesService: AnnouncesService
	storageRepository?: StorageRepository

	constructor(announcesService: AnnouncesService, storageRepository?: StorageRepository) {
		this.announcesService = announcesService
		this.storageRepository = storageRepository
	}

	async execute(input: AnnounceUsecaseParams) {
		try {
			const { file } = input
			const { owner_id, title, text, id } = input.data
			const data = new Announce(id as number, owner_id as number, title, text, null)

			if (this.storageRepository)
				return await this.backend(this.storageRepository, data, file)
			else return await this.frontend(data, file)
		} catch (error) {
			return new EditAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async backend(storageRepository: StorageRepository, data: Announce, file?: File) {
		try {
			const { owner_id, id } = data

			// owner verification
			const announceOwner = await this.announcesService.getOwner(id as number)
			if (owner_id !== announceOwner) throw ErrorMsg.htmlError(htmlError[403])

			// STORING NEW FILE
			if (file) {
				const oldImagePath = await this.announcesService.getImagePath(id as number)
				if (!oldImagePath) new ErrorMsg(`Error: failed to persist`)

				// move new
				const newImagePath = await storageRepository.move(file, filePath.store.announce)

				data.imagePath = newImagePath
				await this.announcesService.edit(data)

				// delete old
				await storageRepository.delete(oldImagePath as string)

				return new ReplyLayer<boolean>(true)
			} else {
				return await this.announcesService.edit(data)
			}
		} catch (error) {
			return new EditAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
	async frontend(data: Announce, file?: File) {
		try {
			return await this.announcesService.edit(data, file)
		} catch (error) {
			return new EditAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
