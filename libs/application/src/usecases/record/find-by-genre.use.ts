import { ErrorHandler, GetShortRecordDTO } from "Shared"
import { RecordsService } from "../../services"
import { UsecaseReply } from "../../utils"
import { GenreUsecaseParams } from "../../adapters"

export class FindRecordsByGenreUsecase {
	mainService: RecordsService
	constructor(mainService: RecordsService) {
		this.mainService = mainService
	}

	async execute(input: GenreUsecaseParams): Promise<UsecaseReply<GetShortRecordDTO[]>> {
		try {
			const genre = input.genre
			const data = await this.mainService.findByGenre(genre)

			return new UsecaseReply<GetShortRecordDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
