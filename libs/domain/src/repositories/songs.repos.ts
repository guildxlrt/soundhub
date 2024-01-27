import { ReplyLayer } from "Shared"
import { ISongSucc } from "Shared"

export interface SongsRepository {
	get(data: unknown): Promise<ReplyLayer<ISongSucc>>
}
