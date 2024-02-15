import { ILabelName, LabelID, RecordID } from "Shared"

export interface RecordLabelRepository {
	add(data: { label: LabelID; record: RecordID }): Promise<boolean>
	edit(data: { label: LabelID; record: RecordID }): Promise<boolean>
	remove(id: RecordID): Promise<boolean>

	getLabelOfRecord(id: RecordID): Promise<ILabelName>
}

export interface ExtBackRecordLabelRepos {
	checkRights(id: number, authID: number): Promise<boolean>
}
export interface ExtFrontRecordLabelRepos {}
