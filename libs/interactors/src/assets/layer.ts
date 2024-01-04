import { DatabaseServices } from "Infra-backend"

export abstract class UsecaseLayer {
	readonly services: DatabaseServices

	constructor(services: DatabaseServices) {
		this.services = services
	}

	abstract execute(inputs: unknown): Promise<unknown>
}
