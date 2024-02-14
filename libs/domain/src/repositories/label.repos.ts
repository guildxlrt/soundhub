import { Label } from "@prisma/client"
import { LabelID } from "Shared"

export interface LabelsRepository {
	create(data: unknown): Promise<boolean>
	edit(data: unknown): Promise<boolean>
	get(id: LabelID): Promise<unknown>
	getAll(): Promise<unknown[]>
	findByCountry(country: string): Promise<Label[]>
}
