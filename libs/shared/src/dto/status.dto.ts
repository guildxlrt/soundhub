import { AnyObject } from "../types"

export class StatusDTO {
	readonly id: number
	readonly status: string

	constructor(id: number, status: string) {
		this.id = id
		this.status = status
	}

	static createFromData(data: AnyObject): StatusDTO {
		return new StatusDTO(data?.["id"], data?.["status"])
	}
}
