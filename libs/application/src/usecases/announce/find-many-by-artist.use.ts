import { IDUsecaseParams, Reply } from "../../assets"
import { AnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"

export class FindAnnouncesByArtistUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}
	async execute(input: IDUsecaseParams): Promise<Reply<AnnounceShortDTO[]>> {
		try {
			const id = input.id

			const data = await this.announcesService.findManyByArtist(id)
			return new Reply<AnnounceShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
