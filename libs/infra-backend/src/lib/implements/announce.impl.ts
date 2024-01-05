import { AnnouncesRepository, IdParams, NewAnnounceParams } from "Domain"

import { Reply } from "../../assets"
import { IAnnounceSucc, IAnnouncesListSucc } from "Shared-utils"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(inputs: NewAnnounceParams): Promise<Reply<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply(true)

		return res
	}

	async modify(inputs: NewAnnounceParams): Promise<Reply<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply(true)

		return res
	}

	async delete(inputs: IdParams): Promise<Reply<void>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply(undefined)

		return res
	}

	async get(inputs: IdParams): Promise<Reply<IAnnounceSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply({})

		return res
	}

	async getAll(): Promise<Reply<IAnnouncesListSucc>> {
		// Return Response
		const res: any = new Reply([])

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<Reply<IAnnouncesListSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply([])

		return res
	}
}
