import { UsecaseLayer, ServicesType, DateUsecaseParams } from "../../../assets"
import { FindEventsByDateReplyDTO, ErrorMsg } from "Shared"

export class FindEventsByDateUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: DateUsecaseParams): Promise<FindEventsByDateReplyDTO> {
		try {
			const { date } = inputs
			return await this.services.events.findManyByDate(date)
		} catch (error) {
			return new FindEventsByDateReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
