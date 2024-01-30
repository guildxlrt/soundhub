import { IAnyObject, ProfileID } from "../types"

export class CreateAnnounceDTO {
	readonly title: string
	readonly text: string

	constructor(title: string, text: string) {
		this.title = title
		this.text = text
	}

	static createFromInput(data: IAnyObject) {
		return new CreateAnnounceDTO(data?.["title"], data?.["text"])
	}
}

export class EditAnnounceDTO {
	readonly id: number
	readonly owner_id: ProfileID
	readonly title: string
	readonly text: string

	constructor(id: number, owner_id: ProfileID, title: string, text: string) {
		this.id = id
		this.owner_id = owner_id
		this.title = title
		this.text = text
	}

	static createFromInput(data: IAnyObject) {
		return new EditAnnounceDTO(
			data?.["id"],
			data?.["owner_id"],
			data?.["title"],
			data?.["text"]
		)
	}
}

export class AnnounceDTO {
	readonly id: number
	readonly owner_id: ProfileID
	readonly title: string
	readonly text: string
	readonly imagePath: string | null

	constructor(
		id: number,
		owner_id: ProfileID,
		title: string,
		text: string,
		imagePath: string | null
	) {
		this.id = id
		this.owner_id = owner_id
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}

	static createFromData(data: IAnyObject) {
		return new AnnounceDTO(
			data?.["id"],
			data?.["owner_id"],
			data?.["title"],
			data?.["text"],
			data?.["imagePath"]
		)
	}
}

export class AnnounceShortDTO {
	readonly id: number
	readonly owner_id: ProfileID
	readonly title: string

	constructor(id: number, owner_id: ProfileID, title: string) {
		this.id = id
		this.owner_id = owner_id
		this.title = title
	}

	static createFromData(data: IAnyObject): AnnounceShortDTO {
		return new AnnounceShortDTO(data?.["id"], data?.["owner_id"], data?.["title"])
	}

	static createArrayFromData(data: IAnyObject[]): AnnounceShortDTO[] {
		return data.map((annouce): AnnounceShortDTO => {
			return new AnnounceShortDTO(annouce?.["id"], annouce?.["owner_id"], annouce?.["title"])
		})
	}
}
