import axios from "axios"
import { NewFormData, apiUriRequest, apiUrlPath, apiUrlRoot } from "../../assets"
import { GetEventDTO, EntityID, GetEventShortDTO, ErrorHandler, EventID } from "Shared"
import { EventsRepository, Event, RawFile } from "Domain"

export class EventsImplement implements EventsRepository {
	async create(data: Event, file?: RawFile): Promise<boolean> {
		const formData = new FormData()
		NewFormData.fromFile(formData, file as RawFile)
		NewFormData.fromObject(formData, data)

		try {
			return await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.events.create}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(data: Event, file?: RawFile): Promise<boolean> {
		const id = data.id
		const formData = new FormData()
		NewFormData.fromFile(formData, file as RawFile)
		NewFormData.fromObject(formData, data)

		try {
			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.events.edit + id}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: EventID): Promise<boolean> {
		try {
			return await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.events.delete + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: EntityID): Promise<GetEventDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events.get + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<GetEventShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events.getAll}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByArtist(id: EntityID): Promise<GetEventShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.artistID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByArtistGenre(genre: string): Promise<GetEventShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.artistGenre + genre}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByDate(date: Date): Promise<GetEventShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.date + date}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByPlace(place: string): Promise<GetEventShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.place + place}`,
				withCredentials: true,
				data: {
					place: place,
				},
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
