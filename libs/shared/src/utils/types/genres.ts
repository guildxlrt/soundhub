export const GenresEnum = {
	rock: "rock",
	metal: "metal",
	electro: "electro",
	jazz: "jazz",
	blues: "blues",
} as const

export type GenreType = (typeof GenresEnum)[keyof typeof GenresEnum]

export type GenresArray = [GenreType, GenreType | undefined, GenreType | undefined]
