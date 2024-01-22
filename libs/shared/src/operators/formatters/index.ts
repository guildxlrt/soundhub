import { GenresArray } from "../../utils"
import { GenresFormatter } from "./genres.fmt"

// VALIDATORS
export class Formatters {
	static genres(genres: GenresArray | string[]) {
		return new GenresFormatter().format(genres)
	}
}
