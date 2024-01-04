import { DatabaseServices } from "Infra-backend"

export abstract class BaseUsecase {
	readonly service: DatabaseServices

	constructor(service: DatabaseServices) {
		this.service = service
	}

	abstract execute(input: unknown): Promise<unknown>
}
