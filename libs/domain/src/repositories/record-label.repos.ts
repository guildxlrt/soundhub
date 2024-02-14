import { Label } from "@prisma/client"
import { LabelID, RecordID } from "Shared"

export interface RecordLabelRepository {
	add(data: unknown): Promise<boolean>
	edit(data: unknown): Promise<boolean>
	delete(data: unknown): Promise<boolean>
	getLabelOfRecord(id: RecordID): Promise<Label>
	getAll(): Promise<Label[]>
}
