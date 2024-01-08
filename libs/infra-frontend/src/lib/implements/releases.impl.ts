import {
	GenreParams,
	IdParams,
	NewReleaseParams,
	ReleasePriceParams,
	ReleasesRepository,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
} from "Shared"
import { Response } from "../../assets"

export class ReleasesImplement implements ReleasesRepository {
	async create(inputs: NewReleaseParams): Promise<Response<INewReleaseSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async modifyPrice(inputs: ReleasePriceParams): Promise<Response<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async get(inputs: IdParams): Promise<Response<IReleaseSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async getAll(): Promise<Response<IReleasesListSucc>> {
		// Return Response
		const res: any = new Response(true)

		return res
	}

	async findManyByGenre(inputs: GenreParams): Promise<Response<IReleasesListSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<Response<IReleasesListSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Response([])

		return res
	}
}
