import { UsecaseLayer, RepositoriesType } from "../../assets"
import { GetAllArtistsReplyDTO, ErrorMsg } from "Shared"

export class GetAllArtistsUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(): Promise<GetAllArtistsReplyDTO> {
		try {
			return await this.services.artists.getAll()
		} catch (error) {
			return new GetAllArtistsReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
