import axios from "axios"
import { Response } from "../../assets"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	AnnouncesRepository,
	noStatus,
	ErrorMsg,
	ModifyAnnounceReqDTO,
	apiRoot,
	apiPath,
	apiEndpts,
	AnnounceId,
	ArtistId,
	CreateAnnounceReqDTO,
	DeleteAnnounceParams,
	NewAnnounceParams,
	ModifyAnnounceParams,
} from "Shared"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(inputs: NewAnnounceParams): Promise<Response<boolean>> {
		try {
			const { text, title } = inputs.data

			return await axios({
				method: "post",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.create}`,
				withCredentials: true,
				data: { title: title, text: text } as CreateAnnounceReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async modify(inputs: ModifyAnnounceParams): Promise<Response<boolean>> {
		try {
			const { text, title } = inputs.data

			return await axios({
				method: "put",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.modify}`,
				withCredentials: true,
				data: { title: title, text: text } as ModifyAnnounceReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async delete(id: DeleteAnnounceParams): Promise<Response<void>> {
		try {
			return await axios({
				method: "delete",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.delete + id}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<void>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async get(id: AnnounceId): Promise<Response<IAnnounceSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.oneById + id}`,
				withCredentials: true,
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
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.all}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async findManyByArtist(id: ArtistId): Promise<Response<IAnnouncesListSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.manyByArtist + id}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}
}
