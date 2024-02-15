import { IFullLabel, ILabelName, LabelID, ItemStatusType } from "Shared"
import { Label, StreamFile } from "../entities"

export interface LabelsRepository {
	create(data: unknown): Promise<boolean>
	edit(data: unknown): Promise<boolean>
	setStatus(data: { id: number; status: ItemStatusType }): Promise<boolean>

	get(id: LabelID): Promise<unknown>
	getAll(): Promise<unknown[]>
	findByCountry(country: string): Promise<unknown[]>
}

export interface ExtBackLabelsRepos {
	checkRights(id: number): Promise<boolean>
	getLogoPath(id: LabelID): Promise<string | null>
	setLogoPath(path: string | null, id: LabelID): Promise<boolean>
}
export interface ExtFrontLabelsRepos {}

export interface LabelsBackendRepos extends LabelsRepository, ExtBackLabelsRepos {
	create(label: Label): Promise<boolean>
	edit(label: Label): Promise<boolean>

	get(id: LabelID): Promise<IFullLabel>
	getAll(): Promise<ILabelName[]>
	findByCountry(country: string): Promise<ILabelName[]>
}

export interface LabelsFrontendRepos extends LabelsRepository, ExtFrontLabelsRepos {
	create(label: { data: Label; logo?: StreamFile }): Promise<boolean>
	edit(label: { data: Label; logo?: StreamFile; deleteLOgo?: boolean }): Promise<boolean>

	get(id: LabelID): Promise<unknown>
	getAll(): Promise<unknown[]>
	findByCountry(country: string): Promise<unknown[]>
}
