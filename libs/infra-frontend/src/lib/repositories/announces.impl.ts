import axios from "axios"
import { NewFormData } from "../../assets"
import { Announce, RawFile } from "Domain"
import {
	AnnounceID,
	ProfileID,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	ErrorHandler,
	AnnounceDTO,
	AnnounceShortDTO,
} from "Shared"
import { AnnouncesRepository } from "Domain"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(data: Announce, file?: RawFile): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, file as RawFile)
			NewFormData.fromObject(formData, data)

			return await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.create}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async edit(data: Announce, file?: RawFile): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, file as RawFile)
			NewFormData.fromObject(formData, data)

			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.edit}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async delete(id: AnnounceID): Promise<boolean> {
		try {
			return await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.delete + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async get(id: AnnounceID): Promise<AnnounceDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.oneByID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async getAll(): Promise<AnnounceShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.all}`,
				withCredentials: true,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async findManyByArtist(id: ProfileID): Promise<AnnounceShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${
					apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.manyByArtist + id
				}`,
				withCredentials: true,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
