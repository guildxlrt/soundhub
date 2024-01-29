import { GenresFormatter } from "./genres.fmt"

// VALIDATORS

export const formatters = {
	genres: new GenresFormatter().format,
}
