import { AnyObject, IArtistName } from "../../types"

export class GetEventShortDTO {
	readonly id: number
	readonly date: Date
	readonly place: string
	readonly artists: IArtistName[]
	readonly title: string

	constructor(id: number, date: Date, place: string, artists: IArtistName[], title: string) {
		this.id = id
		this.date = date
		this.place = place
		this.artists = artists
		this.title = title
	}

	static createFromData(data: AnyObject): GetEventShortDTO {
		const artists: AnyObject[] = data?.["artists"]
		const artistWithNames: IArtistName[] = artists.map((artist) => {
			return {
				name: artist?.["name"],
				id: artist?.["id"],
			}
		})

		return new GetEventShortDTO(
			data?.["id"],
			data?.["date"],
			data?.["place"],
			artistWithNames,
			data?.["title"]
		)
	}
	static createArrayFromData(data: AnyObject[]): GetEventShortDTO[] {
		return data.map((event): GetEventShortDTO => {
			const artists: AnyObject[] = event?.["artists"]
			const artistWithNames: IArtistName[] = artists.map((artist) => {
				return {
					name: artist?.["name"],
					id: artist?.["id"],
				}
			})

			return new GetEventShortDTO(
				event?.["id"],
				event?.["date"],
				event?.["place"],
				artistWithNames,
				event?.["title"]
			)
		})
	}
}
