import { RawFile, Record } from "Domain"
import {
	GenreType,
	EntityID,
	GetFullRecordDTO,
	GetShortRecordDTO,
	ErrorHandler,
	ArtistProfileID,
	RecordID,
	RecordType,
} from "Shared"
import { NewFormData, apiUriRequest, apiUrlPath, apiUrlRoot } from "../../assets"
import axios from "axios"
import { RecordsRepository } from "Domain"

export class RecordsImplement implements RecordsRepository {
	async create(record: { data: Record; cover: RawFile }): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, record.cover, "cover")
			NewFormData.fromObject(formData, record.data, "record")

			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.records.create}`,
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

			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.records.edit + id}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: RecordID): Promise<boolean> {
		try {
			return await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.records.delete + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async publish(id: RecordID): Promise<boolean> {
		try {
			return await axios({
				method: "patch",
				url: `${apiUrlRoot + apiUrlPath.records.publish + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setPublicStatus(id: RecordID, isPublic: boolean): Promise<boolean> {
		try {
			return await axios({
				method: "patch",
				url: `${apiUrlRoot + apiUrlPath.records.setPublicStatus + id}`,

				withCredentials: true,
				data: { id: id, isPublic: isPublic },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: EntityID): Promise<GetFullRecordDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.records.get + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<GetShortRecordDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.records.getAll}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByGenre(genre: GenreType): Promise<GetShortRecordDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.genre + genre}`,

				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByDate(date: Date): Promise<GetShortRecordDTO[]> {
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

	async findByArtist(id: ArtistProfileID): Promise<GetShortRecordDTO[]> {
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

	async findByArtistFeats(id: ArtistProfileID): Promise<GetShortRecordDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.artistFeatsID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByRecordType(type: RecordType): Promise<GetShortRecordDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.recordType + type}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
