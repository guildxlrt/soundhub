import { GetSongReplyDTO, ErrorHandler } from "Shared"
import { IDUsecaseParams } from "../../assets"
import { SongsService } from "../../services"

export class GetSongUsecase {
	songsService: SongsService
	constructor(songsService: SongsService) {
		this.songsService = songsService
	}

	async execute(input: IDUsecaseParams): Promise<GetSongReplyDTO> {
		try {
			const id = input.id
			const data = await this.songsService.get(id)
			return new GetSongReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
