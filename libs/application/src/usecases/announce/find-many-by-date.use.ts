import { UsecaseReply } from "../../utils"
import { GetAnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"
import { DateUsecaseParams } from "../params-adapters"

export class FindAnnouncesByDateUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}
	async execute(input: DateUsecaseParams): Promise<UsecaseReply<GetAnnounceShortDTO[]>> {
		try {
			const date = input.date

			const data = await this.announcesService.findManyByDate(date)
			return new UsecaseReply<GetAnnounceShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
