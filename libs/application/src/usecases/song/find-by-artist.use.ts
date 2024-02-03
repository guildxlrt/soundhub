import { ErrorHandler, SongDTO } from "Shared"
import { IDUsecaseParams, UsecaseReply } from "../../utils"
import { SongsService } from "../../services"

export class FindSongsByArtistUsecase {
	mainService: SongsService
	constructor(mainService: SongsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<SongDTO[]>> {
		try {
			const id = input.id
			const data = await this.mainService.findByArtist(id)
			return new UsecaseReply<SongDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
