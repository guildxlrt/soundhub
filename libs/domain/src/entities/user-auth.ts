import { UserEmail, UserPassword } from "Shared"
import { EntityLayer } from "./layers"

export class UserAuth extends EntityLayer {
	email: UserEmail
	password: UserPassword

	constructor(id: number | null, email: string, password: string) {
		super(id)

		this.email = email
		this.password = password
	}
}
