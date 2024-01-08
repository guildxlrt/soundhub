import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"

export abstract class UsecaseLayer {
	readonly services: DatabaseServices | ApiServices

	constructor(services: DatabaseServices) {
		this.services = services
	}

	abstract execute(inputs: unknown): Promise<unknown>
}
