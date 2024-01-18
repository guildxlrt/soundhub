import { ReplyLayer } from "Shared"
import { ISongSucc } from "Shared"

export interface SongsRepository {
	get(inputs: unknown): Promise<ReplyLayer<ISongSucc>>
}
