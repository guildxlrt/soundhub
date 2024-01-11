import { Response } from "../../assets"
import {
	DateParams,
	EventsRepository,
	IEventSucc,
	IdParams,
	NewEventParams,
	PlaceParams,
} from "Shared"

export class EventsImplement implements EventsRepository {
	async create(inputs: NewEventParams): Promise<Response<boolean>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Response(true)

		return res
	}

	async modify(inputs: NewEventParams): Promise<Response<boolean>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Response(true)

		return res
	}

	async delete(inputs: IdParams): Promise<Response<void>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Response(undefined)

		return res
	}

	async get(inputs: IdParams): Promise<Response<IEventSucc>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response({})

		return res
	}

	async getAll(): Promise<Response<IEventSucc[]>> {
		// Return Response
		const res = new Response([])

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<Response<IEventSucc[]>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Response([])

		return res
	}

	async findManyByDate(inputs: DateParams): Promise<Response<IEventSucc[]>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Response([])

		return res
	}

	async findManyByPlace(inputs: PlaceParams): Promise<Response<IEventSucc[]>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Response([])

		return res
	}
}
