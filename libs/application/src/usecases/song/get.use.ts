import { GetSongReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, IDUsecaseParams } from "../../assets"

export class GetSongUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: IDUsecaseParams): Promise<GetSongReplyDTO> {
		try {
			const id = input.id
			return await this.services.songs.get(id)
		} catch (error) {
			return new GetSongReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
