import { InstrumentType } from "../enums"
import { ProfileID } from "../values"

export interface IBandMember {
	name: string
	instrument: InstrumentType
}

export interface IArtistName {
	name: string
	id: ProfileID
}
