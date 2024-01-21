import axios from "axios"
import { Response } from "../../assets"
import { EventsRepository } from "Domain"
import {
	IEventSucc,
	EntityID,
	NewEventAdapter,
	apiRoot,
	apiPath,
	apiEndpts,
	CreateEventReqDTO,
	ErrorMsg,
	ModifyEventAdapter,
	IEventsListSucc,
	DateAdapter,
	PlaceAdapter,
	DeleteEventAdapter,
} from "Shared"

export class EventsImplement implements EventsRepository {
	async create(inputs: NewEventAdapter): Promise<Response<boolean>> {
		const { owner_id, title, text, date, place, artists } = inputs.data
		try {
			return (await axios({
				method: "post",
				url: `${apiRoot + apiPath.events + apiEndpts.events.create}`,
				withCredentials: true,
				data: {
					owner_id: owner_id,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
				} as CreateEventReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async modify(inputs: ModifyEventAdapter): Promise<Response<boolean>> {
		const { owner_id, title, text, date, place, artists } = inputs.data
		try {
			return (await axios({
				method: "put",
				url: `${apiRoot + apiPath.events + apiEndpts.events.create}`,
				withCredentials: true,
				data: {
					owner_id: owner_id,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
				} as CreateEventReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async delete(inputs: DeleteEventAdapter): Promise<Response<void>> {
		try {
			const { id } = inputs
			return (await axios({
				method: "delete",
				url: `${apiRoot + apiPath.events + apiEndpts.events.delete + id}`,
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
				url: `${apiRoot + apiPath.events + apiEndpts.events.oneByID + id}`,
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
				url: `${apiRoot + apiPath.events + apiEndpts.events.all}`,
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
				url: `${apiRoot + apiPath.events + apiEndpts.events.manyByArtist + id}`,
				withCredentials: true,
			})) as Response<IEventsListSucc>
		} catch (error) {
			return new Response<IEventsListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async findManyByDate(inputs: DateAdapter): Promise<Response<IEventsListSucc>> {
		const { date } = inputs
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.events.manyByDate}`,
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

	async findManyByPlace(inputs: PlaceAdapter): Promise<Response<IEventsListSucc>> {
		const { place } = inputs
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.events.manyByPlace}`,
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
