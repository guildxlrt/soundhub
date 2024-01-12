import { ReplyLayer } from "../../utils"
import { ISongSucc } from "../../utils"

export interface SongsRepository {
	get(inputs: unknown): Promise<ReplyLayer<ISongSucc>>
}
