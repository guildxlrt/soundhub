import { CreateAnnounceReplyDTO, ErrorHandler, ErrorMsg, filePath } from "Shared"
import { AnnounceUsecaseParams } from "../../assets"
import { Announce, File, StorageRepository } from "Domain"
import { AnnouncesService } from "../../services"

export class CreateAnnounceUsecase {
	private announcesService: AnnouncesService
	private storageRepository?: StorageRepository

	constructor(announcesService: AnnouncesService, storageRepository?: StorageRepository) {
		this.announcesService = announcesService
		this.storageRepository = storageRepository
	}

	async execute(input: AnnounceUsecaseParams): Promise<CreateAnnounceReplyDTO> {
		try {
			const { file } = input
			const { owner_id, title, text } = input.data
			const data = new Announce(null, owner_id, title, text, null)

			if (this.storageRepository) {
				return await this.backend(this.storageRepository, data, file)
			} else return await this.frontend(data, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(announce: Announce, file?: File): Promise<CreateAnnounceReplyDTO> {
		try {
			const data = await this.announcesService.create(announce, file)
			return new CreateAnnounceReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		storageRepository: StorageRepository,
		announce: Announce,
		file?: File
	): Promise<CreateAnnounceReplyDTO> {
		try {
			// STORING NEW FILE
			if (file) {
				// move
				const newImagePath = await storageRepository.move(file, filePath.store.announce)
				if (!newImagePath) throw new ErrorMsg(`Error: failed to store`)
				announce.updateImagePath(newImagePath)
			}

			// persist
			await this.announcesService.create(announce)

			return new CreateAnnounceReplyDTO(true)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
