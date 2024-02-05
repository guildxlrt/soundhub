import { AnyObject } from "../types"

export class StatusDTO {
	readonly id: number

	constructor(id: number) {
		this.id = id
	}

	static createFromData(data: AnyObject): StatusDTO {
		return new StatusDTO(data?.["id"])
	}
}
