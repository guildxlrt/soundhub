import { EditAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, AnnounceUsecaseParams } from "../../assets"
import { Announce } from "Domain"

export class EditAnnounceUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: AnnounceUsecaseParams): Promise<EditAnnounceReplyDTO> {
		try {
			const { owner_id, title, text, id } = input.data

			const data = new Announce(id as number, owner_id as number, title, text, null)

			return await this.services.announces.edit(data, input.file)
		} catch (error) {
			return new EditAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
