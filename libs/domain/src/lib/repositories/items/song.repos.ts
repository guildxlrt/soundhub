import { InputLayer } from "../../../assets"
import { SongId, ISong } from "Shared-utils"

export abstract class SongRepository {
	abstract get(inputs: InputLayer<SongId>): Promise<InputLayer<ISong>>
}
