import { IAnyObject } from "../lib"
import { ServicesType } from "./types"

export abstract class UsecaseLayer {
	readonly services: ServicesType

	constructor(services: ServicesType) {
		this.services = services
	}

	abstract execute(inputs: IAnyObject): Promise<unknown>
}
