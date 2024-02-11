import { AnyObject } from "../../types"

interface UpdateReleaseDTO {
	readonly id: number
	readonly title: string
	readonly descript: string | null
	readonly price: number | null
	readonly genres: string[]
}

export class EditReleaseDTO {
	readonly release: UpdateReleaseDTO
	readonly delCover?: boolean

	constructor(release: UpdateReleaseDTO, delCover?: boolean) {
		this.release = release
		this.delCover = delCover
	}

	static createFromInput(release: AnyObject) {
		const cleanRelease: UpdateReleaseDTO = {
			id: release?.["id"],
			title: release?.["title"],
			descript: release?.["descript"],
			price: release?.["price"],
			genres: release?.["genres"],
		}

		return new EditReleaseDTO(cleanRelease)
	}
}
