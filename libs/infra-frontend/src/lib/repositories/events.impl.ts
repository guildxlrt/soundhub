import axios from "axios"
import { NewFormData } from "../../assets"
import {
	EventDTO,
	EntityID,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	EventShortDTO,
	ErrorHandler,
} from "Shared"
import { EventsRepository, Event, RawFile } from "Domain"

export class EventsImplement implements EventsRepository {
	async create(data: Event, file?: RawFile): Promise<boolean> {
		const formData = new FormData()
		NewFormData.fromFile(formData, file as RawFile)
		NewFormData.fromObject(formData, data)

		try {
			return await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.create}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(data: Event, file?: RawFile): Promise<boolean> {
		const formData = new FormData()
		NewFormData.fromFile(formData, file as RawFile)
		NewFormData.fromObject(formData, data)

		try {
			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.create}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			return await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.delete + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: EntityID): Promise<EventDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.oneByID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<EventShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.all}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByArtist(id: EntityID): Promise<EventShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.manyByArtist + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByDate(date: Date): Promise<EventShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.manyByDate}`,
				withCredentials: true,
				data: {
					date: date,
				},
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByPlace(place: string): Promise<EventShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.manyByPlace}`,
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
