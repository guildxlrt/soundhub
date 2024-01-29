import { AuthBackendRepos, UserAuthsRepository, UserCookie } from "Domain"
import {
	ErrorHandler,
	ProfileID,
	UserAuthID,
	UserEmail,
	UserPassword,
	UserProfileType,
} from "Shared"

interface IUserAuthService extends UserAuthsRepository, AuthBackendRepos {}

export class UserAuthService implements IUserAuthService {
	readonly service: IUserAuthService

	constructor(service: IUserAuthService) {
		this.service = service
	}

	async login(first: unknown, two: unknown): Promise<void> {
		try {
			return await this.service.login(first, two)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async logout(): Promise<void> {
		try {
			return await this.service.logout()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async changePass(input: unknown): Promise<boolean> {
		try {
			return await this.service.changePass(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async changeEmail(input: unknown): Promise<boolean> {
		try {
			return await this.service.changeEmail(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	// BACKEND
	async genCookie(
		id: UserAuthID,
		profile: ProfileID,
		profileType: UserProfileType
	): Promise<UserCookie> {
		try {
			return await this.service.genCookie(id, profile, profileType)
		} catch (error) {
			throw ErrorHandler.handle(error)
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
			throw ErrorHandler.handle(error)
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
			throw ErrorHandler.handle(error)
		}
	}
	async compareIDs(databaseID: UserAuthID, inputedID: UserAuthID): Promise<boolean> {
		try {
			return await this.service.compareIDs(databaseID, inputedID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async comparePass(encryptedPass: UserPassword, inputedPass: UserPassword): Promise<boolean> {
		try {
			return await this.service.comparePass(encryptedPass, inputedPass)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async compareEmails(dbEmail: UserPassword, inputedEmail: UserPassword): Promise<boolean> {
		try {
			return await this.service.compareEmails(dbEmail, inputedEmail)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async hashPass(pass: string): Promise<string> {
		try {
			return await this.service.hashPass(pass)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
