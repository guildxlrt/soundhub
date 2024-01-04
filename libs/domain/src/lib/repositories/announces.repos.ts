import { IAnnounce } from "Shared-utils"
import { ArtistItemMethods, RemoveMethods } from "../../assets"
import { IdParams, NewAnnounceParams } from "./params"
import { Reply } from "Shared-utils"

export abstract class AnnouncesRepository implements ArtistItemMethods, RemoveMethods {
	abstract create(inputs: NewAnnounceParams): Promise<Reply<boolean>>

	abstract delete(inputs: IdParams): Promise<Reply<unknown>>

	abstract get(inputs: IdParams): Promise<Reply<IAnnounce>>

	abstract getAll(): Promise<Reply<IAnnounce[]>>

	abstract findManyByArtist(inputs: IdParams): Promise<Reply<IAnnounce[]>>
}
