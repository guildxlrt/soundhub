import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"
import { GetArtistByIDReplyDTO, ErrorMsg } from "Shared"

export class GetArtistByIDUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: IDUsecaseParams): Promise<GetArtistByIDReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.artists.getByID(id)
		} catch (error) {
			return new GetArtistByIDReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
