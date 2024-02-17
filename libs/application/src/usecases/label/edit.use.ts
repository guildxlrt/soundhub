import { UsecaseReply } from "../../utils"
import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { LabelsService, StorageService } from "../../services"
import { EditLabelUsecaseParams } from "../../adapters"

export class EditLabelUsecase {
	private mainService: LabelsService
	private storageService?: StorageService

	constructor(mainService: LabelsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: EditLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
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

	async frontend(input: EditLabelUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { logo, data } = input

			const res = await this.mainService.edit({ data, logo })
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: EditLabelUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { logo, data, deleteLogo } = input
			const { id } = data

			// auths verification
			const checkRights = await this.mainService.checkRights(id as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			// label
			await this.mainService.edit(data)

			// STORING NEW FILE
			// contradiction
			if (logo && deleteLogo === true)
				throw new ErrorMsg("User Logo | contradictory request", 400)

			if (logo || deleteLogo === true) {
				const folderPath = await this.mainService.getLogoPath(id as number)

				if (logo) {
					// delete old
					const oldLogo = "logo.webp"
					const oldLogoPath = filePath.store.label + folderPath + oldLogo
					await storageService.delete(oldLogoPath as string)

					// move new
					const newLogo = "logo.webp"
					const newLogoPath = filePath.store.label + folderPath
					await storageService.move(logo, newLogoPath, newLogo)

					// persist path
					await this.mainService.setLogoPath(newLogoPath, id as number)
				}
			}

			return new UsecaseReply<boolean>(true, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
