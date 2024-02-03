import { DateUsecaseParams, UsecaseReply } from "../../utils"
import { AnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"

export class FindAnnouncesByDateUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}
	async execute(input: DateUsecaseParams): Promise<UsecaseReply<AnnounceShortDTO[]>> {
		try {
			const date = input.date

			const data = await this.announcesService.findManyByDate(date)
			return new UsecaseReply<AnnounceShortDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
