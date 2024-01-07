import { DateParams, EventsRepository, IdParams, NewEventParams, PlaceParams } from "Domain"
import { Reply } from "../../assets"
import { IEventSucc } from "Shared-utils"

export class EventsImplement implements EventsRepository {
	async create(inputs: NewEventParams): Promise<Reply<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Reply(true)

		return res
	}

	async modify(inputs: NewEventParams): Promise<Reply<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Reply(true)

		return res
	}

	async delete(inputs: IdParams): Promise<Reply<void>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Reply(undefined)

		return res
	}

	async get(inputs: IdParams): Promise<Reply<IEventSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply({})

		return res
	}

	async getAll(): Promise<Reply<IEventSucc[]>> {
		// Return Response
		const res = new Reply([])

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<Reply<IEventSucc[]>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Reply([])

		return res
	}

	async findManyByDate(inputs: DateParams): Promise<Reply<IEventSucc[]>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Reply([])

		return res
	}

	async findManyByPlace(inputs: PlaceParams): Promise<Reply<IEventSucc[]>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Reply([])

		return res
	}
}
