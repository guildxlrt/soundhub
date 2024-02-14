import { AnyObject } from "../../types"

interface UpdateRecordDTO {
	readonly id: number
	readonly title: string
	readonly descript: string | null
	readonly price: number | null
	readonly genres: string[]
}

export class EditRecordDTO {
	readonly record: UpdateRecordDTO
	readonly delCover?: boolean

	constructor(record: UpdateRecordDTO, delCover?: boolean) {
		this.record = record
		this.delCover = delCover
	}

	static createFromInput(record: AnyObject) {
		const cleanRecord: UpdateRecordDTO = {
			id: record?.["id"],
			title: record?.["title"],
			descript: record?.["descript"],
			price: record?.["price"],
			genres: record?.["genres"],
		}

		return new EditRecordDTO(cleanRecord)
	}
}
