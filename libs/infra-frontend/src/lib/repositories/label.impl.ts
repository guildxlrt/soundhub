import axios from "axios"
import { NewFormData, apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"
import { Label, LabelsFrontendRepos, RawFile } from "Domain"
import { LabelID, ErrorHandler, GetShortLabelDTO, GetFullLabelDTO, ItemStatusType } from "Shared"

export class LabelsImplement implements LabelsFrontendRepos {
	async create(label: { data: Label; file?: RawFile }): Promise<boolean> {
		try {
			const { file, data } = label
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

	async edit(label: { data: Label; file?: RawFile }): Promise<boolean> {
		try {
			const { file, data } = label
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

	async delete(id: LabelID): Promise<boolean> {
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

	async setStatus(data: { id: number; status: ItemStatusType }): Promise<boolean> {
		try {
			const { id, status } = data

			const url: string = apiUrlRoot + apiUrlPath.announces.delete + id

			return await axios({
				method: "patch",
				url: url,
				withCredentials: true,
				data: {
					id: id,
					status: status,
				},
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: LabelID): Promise<GetFullLabelDTO> {
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

	async search(country: string): Promise<GetShortLabelDTO[]> {
		try {
			const url: string =
				apiUrlRoot + apiUrlPath.search.labels + apiUriQuery.artistID + country

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
