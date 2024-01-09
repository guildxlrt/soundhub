import { genresFormat } from "./genres.fmt"

// FORMATTERS
export const formatters = {
	genres: genresFormat,
}

export type Formatters = typeof formatters
