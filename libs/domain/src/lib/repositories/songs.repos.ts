import { ReplyLayer } from "Shared-utils"
import { ISongSucc } from "Shared-utils"
import { IdParams } from "./params"

export interface SongsRepository {
	get(inputs: IdParams): Promise<ReplyLayer<ISongSucc>>
}
