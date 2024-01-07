import { UserEmail, UserPassword } from "../../utils"
import { EntityLayer } from "./layers"

export class UserAuth extends EntityLayer {
	email: UserEmail
	password: UserPassword

	constructor(id: number | undefined, email: string, password: string, createdAt?: Date) {
		super(id, createdAt)

		this.email = email
		this.password = password
	}
}
