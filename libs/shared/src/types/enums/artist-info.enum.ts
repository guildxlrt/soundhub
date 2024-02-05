// GENRES
export const GenresEnum = {
	rock: "rock",
	metal: "metal",
	electro: "electro",
	jazz: "jazz",
	blues: "blues",
} as const

export type GenreType = (typeof GenresEnum)[keyof typeof GenresEnum]

export type GenresArray = [GenreType, GenreType | null, GenreType | null]

// INSTRUMENTS
export const InstrumentEnum = {
	vocals: "vocals",
	guitar: "guitar",
	drums: "drums",
	bass: "bass",
	keyboard: "keyboard",
} as const

export type InstrumentType = (typeof InstrumentEnum)[keyof typeof InstrumentEnum]

export const ValidInstruments = Object.values(InstrumentEnum)
