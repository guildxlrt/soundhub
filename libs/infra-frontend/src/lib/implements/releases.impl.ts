import {
	GenreParams,
	IdParams,
	NewReleaseParams,
	ModifyReleaseParams,
	ReleasesRepository,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	HideReleaseParams,
} from "Shared"
import { Response } from "../../assets"

export class ReleasesImplement implements ReleasesRepository {
	async create(inputs: NewReleaseParams): Promise<Response<INewReleaseSucc>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async modify(inputs: ModifyReleaseParams): Promise<Response<boolean>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async hide(inputs: HideReleaseParams): Promise<Response<boolean>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async get(inputs: IdParams): Promise<Response<IReleaseSucc>> {
		// calling API
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
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<Response<IReleasesListSucc>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Response([])

		return res
	}
}
