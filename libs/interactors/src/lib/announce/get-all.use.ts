import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { GetAllAnnouncesReplyDTO } from "Dto"

export class GetAllAnnouncesUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllAnnouncesReplyDTO> {
		return await this.services.announces.getAll()
	}
}
