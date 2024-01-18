import { UsecaseLayer, ServicesType } from "../../../assets"
import { FindEventsByDateReplyDTO, ErrorMsg, DateParams } from "Shared"

export class FindEventsByDateUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: DateParams): Promise<FindEventsByDateReplyDTO> {
		try {
			return await this.services.events.findManyByDate(inputs)
		} catch (error) {
			return new FindEventsByDateReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
