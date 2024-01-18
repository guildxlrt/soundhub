import { UsecaseLayer, ServicesType } from "../../../assets"
import { LogoutReplyDTO, ErrorMsg } from "Shared"

export class LogoutUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(): Promise<LogoutReplyDTO> {
		try {
			return await this.services.userAuths.logout()
		} catch (error) {
			return new LogoutReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
