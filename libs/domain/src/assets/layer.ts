import { IAnyObject } from "../lib"
import { ServicesType } from "./types"

export abstract class UsecaseLayer {
	readonly services: ServicesType
	readonly backend: boolean

	constructor(services: ServicesType, backend: boolean) {
		this.services = services
		this.backend = backend
	}

	abstract execute(inputs: IAnyObject): Promise<unknown>
}
