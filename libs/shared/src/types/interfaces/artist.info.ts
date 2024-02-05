import { InstrumentType } from "../enums"
import { ArtistProfileID } from "../values"

export interface IBandMember {
	name: string
	instrument: InstrumentType[]
}

export interface IArtistName {
	name: string
	id: ArtistProfileID
}
