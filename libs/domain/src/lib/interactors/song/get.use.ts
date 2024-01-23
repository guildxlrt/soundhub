import { GetSongReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"

export class GetSongUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: IDUsecaseParams): Promise<GetSongReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.songs.get(id)
		} catch (error) {
			return new GetSongReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
