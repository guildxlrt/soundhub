import { Response } from "../../assets"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	AnnouncesRepository,
	IdParams,
	NewAnnounceParams,
} from "Shared"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(inputs: NewAnnounceParams): Promise<Response<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async modify(inputs: NewAnnounceParams): Promise<Response<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async delete(inputs: IdParams): Promise<Response<void>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(undefined)

		return res
	}

	async get(inputs: IdParams): Promise<Response<IAnnounceSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response({})

		return res
	}

	async getAll(): Promise<Response<IAnnouncesListSucc>> {
		// Return Response
		const res: any = new Response([])

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<Response<IAnnouncesListSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response([])

		return res
	}
}
