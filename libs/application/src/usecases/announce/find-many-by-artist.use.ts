import { UsecaseReply } from "../../utils"
import { GetAnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"
import { IDUsecaseParams } from "../params-adapters"

export class FindAnnouncesByArtistUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetAnnounceShortDTO[]>> {
		try {
			const id = input.id

			const data = await this.announcesService.findManyByArtist(id)
			return new UsecaseReply<GetAnnounceShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
