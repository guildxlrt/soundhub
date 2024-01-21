import axios from "axios"
import { Response } from "../../assets"
import { AnnouncesRepository } from "Domain"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	ErrorMsg,
	ModifyAnnounceReqDTO,
	apiRoot,
	apiPath,
	apiEndpts,
	AnnounceID,
	ArtistID,
	CreateAnnounceReqDTO,
	DeleteAnnounceAdapter,
	NewAnnounceAdapter,
	ModifyAnnounceAdapter,
} from "Shared"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(inputs: NewAnnounceAdapter): Promise<Response<boolean>> {
		try {
			const { text, title } = inputs.data

			return (await axios({
				method: "post",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.create}`,
				withCredentials: true,
				data: { title: title, text: text } as CreateAnnounceReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async modify(inputs: ModifyAnnounceAdapter): Promise<Response<boolean>> {
		try {
			const { text, title } = inputs.data

			return (await axios({
				method: "put",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.modify}`,
				withCredentials: true,
				data: { title: title, text: text } as ModifyAnnounceReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async delete(id: DeleteAnnounceAdapter): Promise<Response<void>> {
		try {
			return (await axios({
				method: "delete",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.delete + id}`,
				withCredentials: true,
			})) as Response<void>
		} catch (error) {
			return new Response<void>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async get(id: AnnounceID): Promise<Response<IAnnounceSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.oneByID + id}`,
				withCredentials: true,
			})) as Response<IAnnounceSucc>
		} catch (error) {
			return new Response<IAnnounceSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async getAll(): Promise<Response<IAnnouncesListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.all}`,
				withCredentials: true,
			})) as Response<IAnnouncesListSucc>
		} catch (error) {
			return new Response<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async findManyByArtist(id: ArtistID): Promise<Response<IAnnouncesListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.manyByArtist + id}`,
				withCredentials: true,
			})) as Response<IAnnouncesListSucc>
		} catch (error) {
			return new Response<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}
}
