import { UserEmail, UserPassword } from "Shared-utils"
import { EntityLayer } from "../../assets"

export class UserAuth extends EntityLayer {
	email: UserEmail
	password: UserPassword

	constructor(id: number, email: string, password: string, createdAt?: Date) {
		super(id, createdAt)

		this.email = email
		this.password = password
	}
}
