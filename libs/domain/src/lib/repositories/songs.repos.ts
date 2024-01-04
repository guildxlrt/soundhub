import { Reply } from "Shared-utils"
import { ISong } from "Shared-utils"
import { IdParams } from "./params"

export abstract class SongsRepository {
	abstract get(inputs: IdParams): Promise<Reply<ISong>>
}
