import { IUserAuth } from "Shared-utils"
import { EntityLayer } from "../../assets"

export class UserAuth extends EntityLayer implements IUserAuth {
	email: string
	password: string

	constructor(id: number, createdAt: Date, email: string, password: string) {
		super(id, createdAt)

		this.email = email
		this.password = password
	}
}
