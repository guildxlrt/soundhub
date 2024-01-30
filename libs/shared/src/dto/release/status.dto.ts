import { AnyObject } from "../../types"

export class ReleaseStatusDTO {
	readonly id: number

	constructor(id: number) {
		this.id = id
	}

	static createFromData(data: AnyObject): ReleaseStatusDTO {
		return new ReleaseStatusDTO(data?.["id"])
	}
}
