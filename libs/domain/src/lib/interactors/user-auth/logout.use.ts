import { UsecaseLayer, ServicesType } from "../../../assets"
import { LogoutReplyDTO, ErrorMsg } from "Shared"

export class LogoutUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(): Promise<LogoutReplyDTO> {
		try {
			return await this.services.userAuths.logout()
		} catch (error) {
			return new LogoutReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
