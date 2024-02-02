import { ErrorHandler, AnnounceShortDTO } from "Shared"
import { IDUsecaseParams, UsecaseReply } from "../../utils"
import { AnnouncesService } from "../../services"

export class GetAnnounceUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<AnnounceShortDTO>> {
		try {
			const id = input.id

			const data = await this.announcesService.get(id)
			return new UsecaseReply<AnnounceShortDTO>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
