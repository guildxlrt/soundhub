import { ErrorHandler, ErrorMsg, envs, filePath } from "Shared"
import { UsecaseReply } from "../../utils"
import { StorageService } from "../../services"
import { LabelsService } from "../../services/labels.service"
import { NewLabelUsecaseParams } from "../../adapters"

export class CreateLabelUsecase {
	private mainService: LabelsService
	private storageService?: StorageService

	constructor(mainService: LabelsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: NewLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { logo, data } = input
			logo?.validateImage()
			data.sanitize()

			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: NewLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { logo, data } = input

			const res = await this.mainService.create({ data, logo })
			return new UsecaseReply(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: NewLabelUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { logo, data } = input

			// CREATE RELEASE FOLDER
			const newFolder = await storageService.mkdir()
			if (!newFolder) throw new ErrorMsg(`Error: failed to store`)
			data.updateLogoPath(newFolder)

			// persist
			const res = await this.mainService.create({
				label: data,
			})

			// STORING NEW FILE
			if (logo) {
				// move
				const filename = "logo.webp"
				const path = filePath.store.label + newFolder
				await logo.move(storageService, path, filename)
			}

			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
