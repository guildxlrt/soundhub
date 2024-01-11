import axios from "axios"
import { Response, apiUrl } from "../../assets"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	AnnouncesRepository,
	IdParams,
	NewAnnounceParams,
	noStatus,
	ErrorMsg,
	CreateAnnounceReqDTO,
	ModifyAnnounceParams,
	ModifyAnnounceReqDTO,
	DeleteAnnounceReqDTO,
	GetAnnounceReqDTO,
	FindAnnouncesByArtistReqDTO,
} from "Shared"

const endpoint = "announces/"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(inputs: NewAnnounceParams): Promise<Response<boolean>> {
		const { artist_id, title, text } = inputs.data
		try {
			return await axios({
				method: "post",
				url: `${apiUrl + endpoint}new`,
				withCredentials: true,
				data: { artist_id: artist_id, title: title, text: text } as CreateAnnounceReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async modify(inputs: ModifyAnnounceParams): Promise<Response<boolean>> {
		const { artist_id, title, text } = inputs.data
		try {
			return await axios({
				method: "put",
				url: `${apiUrl + endpoint}modify`,
				withCredentials: true,
				data: { artist_id: artist_id, title: title, text: text } as ModifyAnnounceReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async delete(inputs: IdParams): Promise<Response<void>> {
		const { id } = inputs
		try {
			return await axios({
				method: "delete",
				url: `${apiUrl + endpoint}delete`,
				withCredentials: true,
				data: { id: id } as DeleteAnnounceReqDTO,
			})
		} catch (error) {
			return new Response<void>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async get(inputs: IdParams): Promise<Response<IAnnounceSucc>> {
		const { id } = inputs
		try {
			return await axios({
				method: "get",
				url: `${apiUrl + endpoint}:${id}`,
				withCredentials: true,
				data: { id: id } as GetAnnounceReqDTO,
			})
		} catch (error) {
			return new Response<IAnnounceSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async getAll(): Promise<Response<IAnnouncesListSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrl + endpoint}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async findManyByArtist(inputs: IdParams): Promise<Response<IAnnouncesListSucc>> {
		const { id } = inputs
		try {
			return await axios({
				method: "get",
				url: `${apiUrl + endpoint}by-artist/:${id}`,
				withCredentials: true,
				data: { id: id } as FindAnnouncesByArtistReqDTO,
			})
		} catch (error) {
			return new Response<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}
}
