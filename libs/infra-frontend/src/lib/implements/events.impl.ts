import axios from "axios"
import { ToFormData, Response } from "../../assets"
import { Event, EventsRepository } from "Domain"
import {
	IEventSucc,
	EntityID,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	ErrorMsg,
	IEventsListSucc,
	FileType,
} from "Shared"

export class EventsImplement implements EventsRepository {
	async create(data: Event, file?: FileType): Promise<Response<boolean>> {
		const formData = new FormData()
		ToFormData.file(formData, file as FileType)
		ToFormData.object(formData, data)

		try {
			return (await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.create}`,
				withCredentials: true,
				data: formData,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async edit(data: Event, file?: FileType): Promise<Response<boolean>> {
		const formData = new FormData()
		ToFormData.file(formData, file as FileType)
		ToFormData.object(formData, data)

		try {
			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.create}`,
				withCredentials: true,
				data: formData,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async delete(id: number): Promise<Response<void>> {
		try {
			return (await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.delete + id}`,
				withCredentials: true,
			})) as Response<void>
		} catch (error) {
			return new Response<void>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async get(id: EntityID): Promise<Response<IEventSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.oneByID + id}`,
				withCredentials: true,
			})) as Response<IEventSucc>
		} catch (error) {
			return new Response<IEventSucc>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async getAll(): Promise<Response<IEventsListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.all}`,
				withCredentials: true,
			})) as Response<IEventsListSucc>
		} catch (error) {
			return new Response<IEventsListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async findManyByArtist(id: EntityID): Promise<Response<IEventsListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.manyByArtist + id}`,
				withCredentials: true,
			})) as Response<IEventsListSucc>
		} catch (error) {
			return new Response<IEventsListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async findManyByDate(date: Date): Promise<Response<IEventsListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.manyByDate}`,
				withCredentials: true,
				data: {
					date: date,
				},
			})) as Response<IEventsListSucc>
		} catch (error) {
			return new Response<IEventsListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async findManyByPlace(place: string): Promise<Response<IEventsListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.events.manyByPlace}`,
				withCredentials: true,
				data: {
					place: place,
				},
			})) as Response<IEventsListSucc>
		} catch (error) {
			return new Response<IEventsListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}
}
