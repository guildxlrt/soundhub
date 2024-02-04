import { UsecaseReply } from "../../utils"
import { AnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"
import { IDUsecaseParams } from "../params-adapters"

export class FindAnnouncesByArtistUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}
	async execute(input: IDUsecaseParams): Promise<UsecaseReply<AnnounceShortDTO[]>> {
		try {
			const id = input.id

			const data = await this.announcesService.findManyByArtist(id)
			return new UsecaseReply<AnnounceShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
