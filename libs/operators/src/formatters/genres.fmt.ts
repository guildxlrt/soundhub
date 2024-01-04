import { ErrorMsg, GenresArray, GenresEnum } from "Shared-utils"

export const genresFormat = (genres: GenresArray): GenresArray => {
	const list = Object.keys(GenresEnum)

	const formattedArray = genres.map((genre, index) => {
		const find = list.includes(String(genre))

		if (find !== true) {
			if (index === 0) {
				throw new ErrorMsg(404, "the first genre cannot be empty")
			} else return undefined
		}
		return genre
	}) as GenresArray

	return [formattedArray[0], formattedArray[1], formattedArray[0]]
}
