import { ErrorHandler, AnnounceShortDTO } from "Shared"
import { IDUsecaseParams, Reply } from "../../assets"
import { AnnouncesService } from "../../services"

export class GetAnnounceUsecase {
	announcesService: AnnouncesService
	constructor(announcesService: AnnouncesService) {
		this.announcesService = announcesService
	}

	async execute(input: IDUsecaseParams): Promise<Reply<AnnounceShortDTO>> {
		try {
			const id = input.id

			const data = await this.announcesService.get(id)
			return new Reply<AnnounceShortDTO>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
