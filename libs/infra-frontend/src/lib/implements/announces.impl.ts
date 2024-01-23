import axios from "axios"
import { ToFormData, Response } from "../../assets"
import { Announce, AnnouncesRepository } from "Domain"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	ErrorMsg,
	AnnounceID,
	ArtistID,
	FileType,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
} from "Shared"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(data: Announce, file?: FileType): Promise<Response<boolean>> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, file as FileType)
			ToFormData.object(formData, data)

			return (await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.create}`,
				withCredentials: true,
				data: formData,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async modify(data: Announce, file?: FileType): Promise<Response<boolean>> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, file as FileType)
			ToFormData.object(formData, data)

			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.modify}`,
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
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.delete + id}`,
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
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.oneByID + id}`,
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
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.all}`,
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
				url: `${
					apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.manyByArtist + id
				}`,
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
