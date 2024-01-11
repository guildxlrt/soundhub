import {
	IArtistInfoSucc,
	IArtistsListSucc,
	INewArtistSucc,
	ArtistsRepository,
	EmailParams,
	GenreParams,
	IdParams,
	ModifyArtistParams,
	NewArtistParams,
} from "Shared"
import { Response } from "../../assets"

export class ArtistsImplement implements ArtistsRepository {
	async create(inputs: NewArtistParams): Promise<Response<INewArtistSucc>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async modify(inputs: ModifyArtistParams): Promise<Response<boolean>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async getById(inputs: IdParams): Promise<Response<IArtistInfoSucc>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async getByEmail(inputs: EmailParams): Promise<Response<IArtistInfoSucc>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}

	async getAll(): Promise<Response<IArtistsListSucc>> {
		// Return Response
		const res: any = new Response(true)

		return res
	}

	async findManyByGenre(inputs: GenreParams): Promise<Response<IArtistsListSucc>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response(true)

		return res
	}
}
