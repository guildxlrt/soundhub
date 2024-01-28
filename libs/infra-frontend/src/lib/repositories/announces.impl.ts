import axios from "axios"
import { ToFormData, Response } from "../../assets"
import { Announce } from "Domain"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	ErrorMsg,
	AnnounceID,
	ProfileID,
	IFile,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
} from "Shared"
import { AnnouncesRepository } from "Domain"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(data: Announce, file?: IFile): Promise<Response<boolean>> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, file as IFile)
			ToFormData.object(formData, data)

			return (await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.create}`,
				withCredentials: true,
				data: formData,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async edit(data: Announce, file?: IFile): Promise<Response<boolean>> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, file as IFile)
			ToFormData.object(formData, data)

			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.edit}`,
				withCredentials: true,
				data: formData,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg("Error Calling API"))
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
			return new Response<void>(undefined, new ErrorMsg("Error Calling API"))
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
			return new Response<IAnnounceSucc>(undefined, new ErrorMsg("Error Calling API"))
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
			return new Response<IAnnouncesListSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async findManyByArtist(id: ProfileID): Promise<Response<IAnnouncesListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${
					apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.manyByArtist + id
				}`,
				withCredentials: true,
			})) as Response<IAnnouncesListSucc>
		} catch (error) {
			return new Response<IAnnouncesListSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}
}
