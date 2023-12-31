import { ErrorMsg, GenresArray, GenresEnum } from "Shared-utils"

export const genresFormat = (genres: GenresArray): GenresArray => {
	try {
		const list = Object.keys(GenresEnum)

		const formattedArray = genres.map((genre, index) => {
			const value = String(genre).toLocaleLowerCase("en-US")
			const find = list.includes(value)

			if (find !== true) {
				if (index === 0) {
					throw new ErrorMsg(404, `Genres: '${value}' is not a genre`)
				} else return undefined
			}
			return genre
		}) as GenresArray

		return [formattedArray[0], formattedArray[1], formattedArray[0]]
	} catch (error) {
		throw new ErrorMsg(500, "error during Genres format", error)
	}
}
