import { EntityLayer } from "../../assets"

export class UserAuth extends EntityLayer {
	email: string
	password: string

	constructor(id: number, email: string, password: string, createdAt?: Date) {
		super(id, createdAt)

		this.email = email
		this.password = password
	}
}
