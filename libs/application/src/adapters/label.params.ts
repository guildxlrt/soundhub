import { PostLabelDTO, EditLabelDTO, ItemStatusType, LabelID, UserAuthID } from "Shared"
import { StreamFile, Label } from "Domain"

export class NewLabelUsecaseParams {
	data: Label
	logo?: StreamFile

	constructor(data: Label, logo?: StreamFile) {
		this.data = data
		this.logo = logo
	}

	static fromBackend(dto: PostLabelDTO, user: number, logo?: StreamFile | unknown) {
		const { status, creationDate, name, bio, website, country, logoPath } = dto

		const labelData = new Label(
			null,
			status as ItemStatusType,
			name,
			creationDate,
			bio,
			website,
			country,
			logoPath
		)

		return new NewLabelUsecaseParams(labelData, logo as StreamFile)
	}
}

export class EditLabelUsecaseParams {
	data: Label
	logo?: StreamFile
	deleteLogo?: boolean

	constructor(data: Label, logo?: StreamFile, deleteLogo?: boolean) {
		this.data = data
		this.logo = logo
		this.deleteLogo = deleteLogo
	}

	static fromBackend(dto: EditLabelDTO, userID: number, logo?: StreamFile | unknown) {
		const deleteLogo = dto.deleteLogo
		const { id, creationDate, name, bio, website, country, logoPath } = dto.label

		const labelData = new Label(id, null, name, creationDate, bio, website, country, logoPath)

		return new EditLabelUsecaseParams(labelData, logo as StreamFile, deleteLogo)
	}
}

export class SetStatusLabelUsecaseParams {
	id: LabelID
	status: ItemStatusType
	authID?: UserAuthID

	constructor(id: LabelID, status: ItemStatusType, authID?: UserAuthID) {
		this.id = id
		this.status = status
		this.authID = authID
	}

	static fromBackend(id: LabelID, status: ItemStatusType, authID?: UserAuthID) {
		return new SetStatusLabelUsecaseParams(id, status, authID)
	}
}
