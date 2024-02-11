import { UsecaseReply } from "../../utils"
import { GetAnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"
import { DateUsecaseParams } from "../../adapters"
import { DateFormatter } from "Domain"

export class FindAnnouncesByDateUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}
	async execute(input: DateUsecaseParams): Promise<UsecaseReply<GetAnnounceShortDTO[]>> {
		try {
			const { date } = input

			const dateFormatter = new DateFormatter()
			const cleanDate = dateFormatter.format(date)

			const data = await this.announcesService.findManyByDate(cleanDate)
			return new UsecaseReply<GetAnnounceShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
