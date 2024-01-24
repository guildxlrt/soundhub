import { UsecaseLayer, ServicesType, HideReleaseUsecaseParams } from "../../../assets"
import { HideReleaseReplyDTO, ErrorMsg } from "Shared"

export class HideReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: HideReleaseUsecaseParams): Promise<HideReleaseReplyDTO> {
		try {
			const { id, isPublic, ownerID } = inputs

			return await this.services.releases.hide(id, isPublic, ownerID)
		} catch (error) {
			return new HideReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
