import { LabelID, RecordID } from "Shared"
import { dbClient } from "../database"
import { RecordLabelRepository } from "Domain"

export class RecordLabelsImplement implements RecordLabelRepository {
	private relation = dbClient.recordLabel

	async add(data: { label: LabelID; record: RecordID }): Promise<boolean> {
		const { label, record } = data

		return await this.relation
			.create({
				data: {
					label_id: label,
					record_id: record,
				},
			})
			.then(() => {
				return true
			})
	}

	async edit(data: { label: LabelID; record: RecordID }): Promise<boolean> {
		const { label, record } = data

		return await this.relation
			.update({
				where: {
					record_id: record,
				},
				data: {
					label_id: label,
				},
			})
			.then(() => {
				return true
			})
	}
	async remove(id: RecordID): Promise<boolean> {
		return await this.relation
			.delete({
				where: {
					record_id: id,
				},
			})
			.then(() => {
				return true
			})
	}

	async getLabelOfRecord(id: RecordID): Promise<{ id: number; name: string }> {
		return await this.relation
			.findUniqueOrThrow({
				where: {
					record_id: id,
				},
				select: {
					record_id: true,
					label: {
						select: {
							name: true,
						},
					},
				},
			})
			.then((data) => {
				return { id: data.record_id, name: data.label.name }
			})
	}

	async checkRights(record: number, authID: number): Promise<boolean> {
		return await this.relation
			.findFirst({
				where: {
					record_id: record,
					record: { createdBy: authID },
				},
			})
			.then((data) => {
				if (!data) return false
				else return true
			})
	}
}
