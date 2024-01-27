import { UsecaseLayer, RepositoriesType, DateUsecaseParams } from "../../assets"
import { FindEventsByDateReplyDTO, ErrorMsg } from "Shared"

export class FindEventsByDateUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: DateUsecaseParams): Promise<FindEventsByDateReplyDTO> {
		try {
			const { date } = input
			return await this.services.events.findManyByDate(date)
		} catch (error) {
			return new FindEventsByDateReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
