import { GenresArray, GenresEnum, ErrorHandler, ErrorMsg } from "Shared"

export class GenresFormatter {
	format(genres: GenresArray | string[]): GenresArray {
		try {
			const list = Object.keys(GenresEnum)

			const formattedArray = genres.map((genre, index) => {
				const value = String(genre).toLocaleLowerCase("en-US")

				const find = list.includes(value)
				if (find !== true && index === 0)
					throw new ErrorMsg(
						`Genres: '${value}' is not a genre, at least one valid genre is required`
					)

				return value
			}) as GenresArray

			return [formattedArray[0], formattedArray[1], formattedArray[2]]
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
