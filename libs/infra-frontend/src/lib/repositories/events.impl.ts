import axios from "axios"
import { NewFormData, apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"
import {
	GetEventDTO,
	EntityID,
	GetEventShortDTO,
	ErrorHandler,
	EventID,
	ArtistProfileID,
} from "Shared"
import { EventsFrontendRepos, Event, RawFile } from "Domain"

export class EventsImplement implements EventsFrontendRepos {
	async create(input: {
		event: Event
		artists: ArtistProfileID[]
		file?: RawFile
	}): Promise<boolean> {
		const { file, event, artists } = input

		const formData = new FormData()
		NewFormData.fromObject(formData, event)
		NewFormData.fromObject(formData, artists)
		NewFormData.fromFile(formData, file as RawFile)

		try {
			const url: string = apiUrlRoot + apiUrlPath.events.create

			return await axios({
				method: "post",
				url: url,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(event: { data: Event; file?: RawFile }): Promise<boolean> {
		const { file, data } = event
		const id = data.id

		const formData = new FormData()
		NewFormData.fromFile(formData, file as RawFile)
		NewFormData.fromObject(formData, data)

		try {
			const url: string = apiUrlRoot + apiUrlPath.events.edit + id

			return await axios({
				method: "put",
				url: url,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: EventID): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.events.delete + id

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: EntityID): Promise<GetEventDTO> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.events.get + id

			return await axios({
				method: "get",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async search(date: Date, place: string): Promise<GetEventShortDTO[]> {
		try {
			const url: string =
				apiUrlRoot + apiUrlPath.search + apiUriQuery.date + date + apiUriQuery.place + place

			return await axios({
				method: "get",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
