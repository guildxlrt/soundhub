import { AnnounceShortDTO, ErrorHandler } from "Shared"
import { AnnouncesService } from "../../services"
import { Reply } from "../../assets"

export class GetAllAnnouncesUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}
	async execute(): Promise<Reply<AnnounceShortDTO[]>> {
		try {
			const data = await this.announcesService.getAll()

			return new Reply<AnnounceShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
