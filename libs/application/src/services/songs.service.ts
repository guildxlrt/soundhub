import { SongsRepository } from "Domain"
import { ErrorMsg, ISongSucc, ReplyLayer, htmlError } from "Shared"

export class SongsService implements SongsRepository {
	private service: SongsRepository

	constructor(service: SongsRepository) {
		this.service = service
	}

	// SERVIVES
	async get(id: unknown): Promise<ReplyLayer<ISongSucc>> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}
