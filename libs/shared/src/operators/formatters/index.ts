import { genresFormat } from "./genres.fmt"
import { passwdFormat } from "./passwd.fmt"

// FORMATTERS
export const formatters = {
	passwd: passwdFormat,
	genres: genresFormat,
}

export type Formatters = typeof formatters
