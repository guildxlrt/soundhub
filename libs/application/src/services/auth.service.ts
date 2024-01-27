import { AuthRepository } from "Domain"
import { ErrorMsg, UserAuthID, UserEmail, UserPassword, htmlError } from "Shared"

export class AuthServices {
	private service: AuthRepository

	constructor(service: AuthRepository) {
		this.service = service
	}

	// SERVIVES
	async getByID(id: UserAuthID): Promise<{
		id: number
		email: string
		password: string
	}> {
		try {
			return await this.service.getByID(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getByEmail(email: UserEmail): Promise<{
		id: number
		email: string
		password: string
	}> {
		try {
			return await this.service.getByEmail(email)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}

	async compareIDs(databaseID: UserAuthID, inputedID: UserAuthID): Promise<boolean> {
		try {
			return await this.service.compareIDs(databaseID, inputedID)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async comparePass(encryptedPass: UserPassword, inputedPass: UserPassword): Promise<boolean> {
		try {
			return await this.service.comparePass(encryptedPass, inputedPass)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async compareEmails(dbEmail: UserPassword, inputedEmail: UserPassword): Promise<boolean> {
		try {
			return await this.service.compareEmails(dbEmail, inputedEmail)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}
