import { IDUsecaseParams, UsecaseReply } from "../../utils"
import { AnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"

export class FindAnnouncesByArtistUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<AnnounceShortDTO[]>> {
		try {
			const id = input.id

			const data = await this.announcesService.findManyByArtist(id)
			return new UsecaseReply<AnnounceShortDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
