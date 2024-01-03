import { genresFormat } from "./genres.format"
import { passwdFormat } from "./passwd.format"

// FORMATTERS
export const formatters = {
	passwd: passwdFormat,
	genres: genresFormat,
}

export type Formatters = typeof formatters
