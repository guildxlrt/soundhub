import { ErrorHandler, SongDTO } from "Shared"
import { IDUsecaseParams, Reply } from "../../assets"
import { SongsService } from "../../services"

export class GetSongUsecase {
	songsService: SongsService
	constructor(songsService: SongsService) {
		this.songsService = songsService
	}

	async execute(input: IDUsecaseParams): Promise<Reply<SongDTO>> {
		try {
			const id = input.id
			const data = await this.songsService.get(id)
			return new Reply<SongDTO>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
