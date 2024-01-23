import { GetSongReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"

export class GetSongUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: IDUsecaseParams): Promise<GetSongReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.songs.get(id)
		} catch (error) {
			return new GetSongReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
