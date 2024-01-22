import { UsecaseLayer, ServicesType } from "../../../assets"
import { FindEventsByDateReplyDTO, ErrorMsg, DateAdapter } from "Shared"

export class FindEventsByDateUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: DateAdapter): Promise<FindEventsByDateReplyDTO> {
		try {
			const { date } = inputs
			return await this.services.events.findManyByDate(date)
		} catch (error) {
			return new FindEventsByDateReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}