import { UsecaseLayer, ServicesType } from "../../../assets"
import { GetAllArtistsReplyDTO, ErrorMsg } from "Shared"

export class GetAllArtistsUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(): Promise<GetAllArtistsReplyDTO> {
		try {
			return await this.services.artists.getAll()
		} catch (error) {
			return new GetAllArtistsReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
