import { RawFile, Record } from "Domain"
import {
	GenreType,
	EntityID,
	GetFullRecordDTO,
	GetShortRecordDTO,
	ErrorHandler,
	RecordID,
	RecordType,
	ItemStatusType,
} from "Shared"
import { NewFormData, apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"
import axios from "axios"
import { RecordsFrontendRepos } from "Domain"

export class RecordsImplement implements RecordsFrontendRepos {
	async create(record: { data: Record; cover: RawFile }): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, record.cover, "cover")
			NewFormData.fromObject(formData, record.data, "record")

			const url: string = apiUrlRoot + apiUrlPath.records.create

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

	async edit(record: { data: Record; cover?: RawFile | undefined }): Promise<boolean> {
		try {
			const { id } = record.data

			const formData = new FormData()
			NewFormData.fromFile(formData, record?.cover as RawFile, "cover")
			NewFormData.fromObject(formData, record.data, "record")

			const url: string = apiUrlRoot + apiUrlPath.records.edit + id

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

	async delete(id: RecordID): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.records.delete + id

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setStatus(id: RecordID, status: ItemStatusType): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.records.setStatus + id

			return await axios({
				method: "patch",
				url: url,

				withCredentials: true,
				data: { id: id, status: status },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: EntityID): Promise<GetFullRecordDTO> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.records.get + id

			return await axios({
				method: "get",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async search(genre: GenreType, date: Date, type: RecordType): Promise<GetShortRecordDTO[]> {
		try {
			const url: string =
				apiUrlRoot +
				apiUrlPath.search +
				apiUriQuery.genre +
				genre +
				apiUriQuery.date +
				date +
				apiUriQuery.recordType +
				type

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
