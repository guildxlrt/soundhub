import { ILabelName, LabelID, RecordID } from "Shared"

export interface RecordLabelRepository {
	add(data: { label: LabelID; record: RecordID }): Promise<boolean>
	edit(data: { label: LabelID; record: RecordID }): Promise<boolean>
	remove(id: RecordID): Promise<boolean>
}

export interface ExtBackRecordLabelRepos {
	getLabelName(recordID: RecordID): Promise<ILabelName>
	checkRights(id: number, authID: number): Promise<boolean>
}
export interface ExtFrontRecordLabelRepos {}

export interface RecordLabelBackendRepos extends RecordLabelRepository, ExtBackRecordLabelRepos {}

export interface RecordLabelFrontendRepos extends RecordLabelRepository, ExtFrontRecordLabelRepos {}
