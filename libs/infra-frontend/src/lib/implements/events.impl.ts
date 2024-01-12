import axios from "axios"
import { Response } from "../../assets"
import {
	EventsRepository,
	IEventSucc,
	EntityId,
	NewEventParams,
	apiRoot,
	apiPath,
	apiEndpts,
	CreateEventReqDTO,
	ErrorMsg,
	noStatus,
	ModifyEventParams,
	IEventsListSucc,
	DateParams,
	PlaceParams,
	DeleteEventParams,
} from "Shared"

export class EventsImplement implements EventsRepository {
	async create(inputs: NewEventParams): Promise<Response<boolean>> {
		const { planner, title, text, date, place, artists } = inputs.data
		try {
			return await axios({
				method: "post",
				url: `${apiRoot + apiPath.events + apiEndpts.events.create}`,
				withCredentials: true,
				data: {
					planner: planner,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
				} as CreateEventReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async modify(inputs: ModifyEventParams): Promise<Response<boolean>> {
		const { planner, title, text, date, place, artists } = inputs.data
		try {
			return await axios({
				method: "put",
				url: `${apiRoot + apiPath.events + apiEndpts.events.create}`,
				withCredentials: true,
				data: {
					planner: planner,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
				} as CreateEventReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async delete(inputs: DeleteEventParams): Promise<Response<void>> {
		try {
			const { id } = inputs
			return await axios({
				method: "delete",
				url: `${apiRoot + apiPath.events + apiEndpts.events.delete + id}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<void>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async get(id: EntityId): Promise<Response<IEventSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.events.oneById + id}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IEventSucc>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async getAll(): Promise<Response<IEventsListSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.events.all}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IEventsListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async findManyByArtist(id: EntityId): Promise<Response<IEventsListSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.events.manyByArtist + id}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IEventsListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async findManyByDate(inputs: DateParams): Promise<Response<IEventsListSucc>> {
		const { date } = inputs
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.events.manyByDate}`,
				withCredentials: true,
				data: {
					date: date,
				},
			})
		} catch (error) {
			return new Response<IEventsListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async findManyByPlace(inputs: PlaceParams): Promise<Response<IEventsListSucc>> {
		const { place } = inputs
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.events.manyByPlace}`,
				withCredentials: true,
				data: {
					place: place,
				},
			})
		} catch (error) {
			return new Response<IEventsListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}
}
