import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetAllAnnouncesReplyDTO } from "Dto"

export class GetAllAnnouncesUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllAnnouncesReplyDTO> {
		return await this.services.announces.getAll()
	}
}
