import { ErrorHandler, GetAnnounceShortDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { AnnouncesService } from "../../services"
import { IDUsecaseParams } from "../../adapters"

export class GetAnnounceUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetAnnounceShortDTO>> {
		try {
			const id = input.id

			const data = await this.announcesService.get(id)
			return new UsecaseReply<GetAnnounceShortDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
