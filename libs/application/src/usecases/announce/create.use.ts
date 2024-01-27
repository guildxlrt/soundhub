import { CreateAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, AnnounceUsecaseParams } from "../../assets"
import { Announce } from "Domain"

export class CreateAnnounceUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: AnnounceUsecaseParams): Promise<CreateAnnounceReplyDTO> {
		try {
			const { owner_id, title, text } = input.data

			const data = new Announce(null, owner_id as number, title, text, null)
			return await this.services.announces.create(data, input.file)
		} catch (error) {
			return new CreateAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
