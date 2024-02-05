import { ExtBackUserAuthsRepos, ExtFrontUserAuthsRepos, UserAuthsRepository } from "Domain"
import { AnyObject, ErrorHandler, UserAuthID, UserEmail, UserPassword } from "Shared"

interface IUserAuthService
	extends UserAuthsRepository,
		ExtBackUserAuthsRepos,
		ExtFrontUserAuthsRepos {}

export class UserAuthService implements IUserAuthService {
	readonly service: IUserAuthService

	constructor(service: IUserAuthService) {
		this.service = service
	}

	async login(email: UserEmail, password: UserPassword): Promise<boolean> {
		try {
			return await this.service.login(email, password)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async logout(): Promise<boolean> {
		try {
			return await this.service.logout()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async changePass(input: AnyObject): Promise<boolean> {
		try {
			return await this.service.changePass(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async changeEmail(input: {
		actual: UserPassword
		newOne: UserPassword
		confirm: UserPassword | null
		userAuthID?: UserAuthID
	}): Promise<boolean> {
		try {
			return await this.service.changeEmail(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	// BACKEND

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
}
