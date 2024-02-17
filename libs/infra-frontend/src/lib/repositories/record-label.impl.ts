import axios from "axios"
import { apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"
import { ErrorHandler, RecordID, LabelID, ILabelName } from "Shared"
import { RecordLabelFrontendRepos } from "Domain"

export class RecordLabelImplement implements RecordLabelFrontendRepos {
	async add(data: { label: LabelID; record: RecordID }): Promise<boolean> {
		try {
			const { label, record } = data

			const url: string = apiUrlRoot + apiUrlPath.songs.add + label

			return await axios({
				method: "post",
				url: url,
				withCredentials: true,
				data: { label: label, record: record },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(data: { label: LabelID; record: RecordID }): Promise<boolean> {
		try {
			const { label, record } = data

			const url: string = apiUrlRoot + apiUrlPath.songs.edit + label

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
				data: { label: label, record: record },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async remove(id: RecordID): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.songs.remove + id

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getLabelName(recordID: RecordID): Promise<ILabelName> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.search + apiUriQuery.recordID + recordID

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
