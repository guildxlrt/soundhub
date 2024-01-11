import { ReplyLayer } from "../../utils"
import { ISongSucc } from "../../utils"
import { IdParams } from "../params"

export interface SongsRepository {
	get(inputs: IdParams): Promise<ReplyLayer<ISongSucc>>
}
