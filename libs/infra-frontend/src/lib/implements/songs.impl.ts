import { Response } from "../../assets"
import { IdParams, SongsRepository, ISongSucc } from "Shared"

export class SongsImplement implements SongsRepository {
	async get(inputs: IdParams): Promise<Response<ISongSucc>> {
		// calling API
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response({})

		return res
	}
}
