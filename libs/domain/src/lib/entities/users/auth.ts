import { BaseEntity } from "../../../assets"

export class UserAuth extends BaseEntity {
	email: string
	password: string

	constructor(id: number, createdAt: Date, email: string, password: string) {
		super(id, createdAt)

		this.email = email
		this.password = password
	}
}
