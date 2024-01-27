import { UsecaseLayer, RepositoriesType, HideReleaseUsecaseParams } from "../../assets"
import { HideReleaseReplyDTO, ErrorMsg } from "Shared"

export class HideReleaseUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: HideReleaseUsecaseParams): Promise<HideReleaseReplyDTO> {
		try {
			const { id, isPublic, ownerID } = input

			return await this.services.releases.hide(id, isPublic, ownerID)
		} catch (error) {
			return new HideReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
