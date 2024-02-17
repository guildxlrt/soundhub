import axios from "axios"
import { NewFormData, apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"
import { Announce, RawFile } from "Domain"
import {
	AnnounceID,
	ArtistProfileID,
	ErrorHandler,
	GetAnnounceDTO,
	GetAnnounceShortDTO,
} from "Shared"
import { AnnouncesFrontendRepos } from "Domain"

export class AnnouncesImplement implements AnnouncesFrontendRepos {
	async create(data: Announce, file?: RawFile): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, file as RawFile)
			NewFormData.fromObject(formData, data)

			const url: string = apiUrlRoot + apiUrlPath.announces.create

			return await axios({
				method: "post",
				url: url,
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

			const url: string = apiUrlRoot + apiUrlPath.announces.edit + id

			return await axios({
				method: "put",
				url: url,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: AnnounceID): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.announces.delete + id

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: AnnounceID): Promise<GetAnnounceDTO> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.announces.get + id

			return await axios({
				method: "get",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async search(id: ArtistProfileID, date: Date): Promise<GetAnnounceShortDTO[]> {
		try {
			const url: string =
				apiUrlRoot +
				apiUrlPath.search.artists +
				apiUriQuery.artistID +
				id +
				apiUriQuery.date +
				date

			return await axios({
				method: "get",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
