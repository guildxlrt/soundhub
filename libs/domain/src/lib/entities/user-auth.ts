import { IUserAuth, UserEmail, UserPassword } from "Shared"
import { EntityLayer } from "./layers"

export class UserAuth extends EntityLayer implements IUserAuth {
	email: UserEmail
	password: UserPassword

	constructor(id: number | undefined, email: string, password: string, createdAt?: Date) {
		super(id, createdAt)

		this.email = email
		this.password = password
	}
}
