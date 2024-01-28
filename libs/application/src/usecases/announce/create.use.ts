import { CreateAnnounceReplyDTO, ErrorMsg, ReplyLayer, filePath, htmlError } from "Shared"
import { AnnounceUsecaseParams } from "../../assets"
import { Announce, File, StorageRepository } from "Domain"
import { AnnouncesService } from "../../services"

export class CreateAnnounceUsecase {
	announcesService: AnnouncesService
	storageRepository?: StorageRepository

	constructor(announcesService: AnnouncesService, storageRepository?: StorageRepository) {
		this.announcesService = announcesService
		this.storageRepository = storageRepository
	}

	async execute(input: AnnounceUsecaseParams) {
		try {
			const { file } = input
			const { owner_id, title, text } = input.data
			const data = new Announce(null, owner_id, title, text, null)

			if (this.storageRepository) {
				return await this.backend(this.storageRepository, data, file)
			} else return await this.frontend(data, file)
		} catch (error) {
			return new CreateAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async backend(storageRepository: StorageRepository, data: Announce, file?: File) {
		try {
			// STORING NEW FILE
			if (file) {
				// move
				const newImagePath = await storageRepository.move(file, filePath.store.announce)

				// save
				data.imagePath = newImagePath
				await this.announcesService.create(data)

				return new ReplyLayer<boolean>(true)
			} else {
				return await this.announcesService.create(data)
			}
		} catch (error) {
			return new CreateAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async frontend(data: Announce, file?: File) {
		try {
			return await this.announcesService.create(data, file)
		} catch (error) {
			return new CreateAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
