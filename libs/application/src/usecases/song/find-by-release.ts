import { ErrorHandler, SongDTO } from "Shared"
import { IDParamsAdapter, Reply } from "../../assets"
import { SongsService } from "../../services"

export class FindSongsByReleaseUsecaseUsecase {
	songsService: SongsService
	constructor(songsService: SongsService) {
		this.songsService = songsService
	}

	async execute(input: IDParamsAdapter): Promise<Reply<SongDTO[]>> {
		try {
			const id = input.id
			const data = await this.songsService.findByRelease(id)
			return new Reply<SongDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
