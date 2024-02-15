import { AnyObject } from "../../types"

interface UpdateLabelDTO {
	readonly id: number
	readonly name: string
	readonly creationDate: Date
	readonly bio: string | null
	readonly website: string | null
	readonly country: string
	readonly logoPath: string
}

export class EditLabelDTO {
	readonly label: UpdateLabelDTO
	readonly deleteLogo?: boolean

	constructor(label: UpdateLabelDTO, deleteLogo?: boolean) {
		this.label = label
		this.deleteLogo = deleteLogo
	}

	static createFromInput(label: AnyObject) {
		const cleanLabel: UpdateLabelDTO = {
			id: label?.["id"],
			name: label?.["name"],
			creationDate: label?.["creationDate"],
			bio: label?.["bio"],
			website: label?.["website"],
			country: label?.["country"],
			logoPath: label?.["logoPath"],
		}

		return new EditLabelDTO(cleanLabel)
	}
}
