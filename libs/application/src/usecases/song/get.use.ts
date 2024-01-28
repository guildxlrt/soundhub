import { GetSongReplyDTO, ErrorMsg } from "Shared"
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
			return await this.songsService.get(id)
		} catch (error) {
			return new GetSongReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
