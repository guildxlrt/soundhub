import { DatabaseServices } from "Infra-backend"
import { CreateAnnounceReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { NewAnnounceParams } from "Domain"

export class CreateAnnounceUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: NewAnnounceParams): Promise<CreateAnnounceReplyDTO> {
		return await this.services.announces.create(inputs)
	}
}
