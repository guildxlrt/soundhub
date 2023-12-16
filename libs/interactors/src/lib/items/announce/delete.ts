import { DatabaseServices } from "Infra-backend"
import { DeleteAnnouncesDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class DeleteAnnounceUsecase extends BaseUsecase<DeleteAnnouncesDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: DeleteAnnouncesDTO): Promise<DeleteAnnouncesDTO> {
		return await this.service.announce.delete(inputs)
	}
}
