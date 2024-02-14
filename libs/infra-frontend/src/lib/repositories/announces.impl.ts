import axios from "axios"
import { NewFormData, apiUrlPath, apiUrlRoot, apiUriRequest } from "../../assets"
import { Announce, RawFile } from "Domain"
import {
	AnnounceID,
	ArtistProfileID,
	ErrorHandler,
	GetAnnounceDTO,
	GetAnnounceShortDTO,
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
				url: `${apiUrlRoot + apiUrlPath.announces.create}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(data: Announce, file?: RawFile): Promise<boolean> {
		try {
			const id = data.id
			const formData = new FormData()
			NewFormData.fromFile(formData, file as RawFile)
			NewFormData.fromObject(formData, data)

			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.announces.edit + id}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: AnnounceID): Promise<boolean> {
		try {
			return await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.announces.delete + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: AnnounceID): Promise<GetAnnounceDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.announces.get + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<GetAnnounceShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.announces.getAll}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByArtist(id: ArtistProfileID): Promise<GetAnnounceShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.artistID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByDate(date: Date): Promise<GetAnnounceShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.date + date}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
