import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetAllAnnouncesReplyDTO } from "Dto"

export class GetAllAnnouncesUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(): Promise<GetAllAnnouncesReplyDTO> {
		return await this.services.announces.getAll()
	}
}
