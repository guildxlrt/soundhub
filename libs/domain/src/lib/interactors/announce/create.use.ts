import { CreateAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, AnnounceUsecaseParams } from "../../../assets"
import { Announce } from "../../entities"

export class CreateAnnounceUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: AnnounceUsecaseParams): Promise<CreateAnnounceReplyDTO> {
		try {
			const { owner_id, title, text } = inputs.data

			const data = new Announce(null, owner_id as number, title, text, null)
			return await this.services.announces.create(data, inputs.file)
		} catch (error) {
			return new CreateAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
