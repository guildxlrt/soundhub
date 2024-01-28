import { AuthRepository, UserCookie } from "Domain"
import {
	ProfileID,
	ErrorMsg,
	UserAuthID,
	UserEmail,
	UserPassword,
	UserProfileType,
	htmlError,
} from "Shared"

export class AuthService implements AuthRepository {
	private service: AuthRepository

	constructor(service: AuthRepository) {
		this.service = service
	}

	// SERVIVES
	async genCookie(
		id: UserAuthID,
		profile: ProfileID,
		profileType: UserProfileType
	): Promise<UserCookie> {
		try {
			return await this.service.genCookie(id, profile, profileType)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}

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

	async hashPass(pass: string): Promise<string> {
		try {
			return await this.service.hashPass(pass)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}
