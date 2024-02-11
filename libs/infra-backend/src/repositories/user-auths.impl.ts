import { UserAuthsBackendRepos } from "Domain"
import { ErrorMsg, UserAuthID, htmlError, UserEmail, AnyObject } from "Shared"
import { DatabaseErrorHandler } from "../utils"
import { dbClient } from "../database"

export class UserAuthsImplement implements UserAuthsBackendRepos {
	private userAuth = dbClient.userAuth

	async login(): Promise<boolean> {
		return true
	}
	async logout(): Promise<boolean> {
		return true
	}

	async changePass(input: AnyObject): Promise<boolean> {
		try {
			const { newOne, userAuthID } = input

			await this.userAuth.update({
				where: {
					id: userAuthID,
				},
				data: {
					password: newOne,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async changeEmail(input: AnyObject): Promise<boolean> {
		try {
			const { newOne, userAuthID } = input

			await this.userAuth.update({
				where: {
					id: userAuthID,
				},
				data: {
					email: newOne,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getByEmail(email: UserEmail): Promise<{
		id: number
		email: string
		password: string
	}> {
		try {
			const authData = await this.userAuth.findUniqueOrThrow({
				where: {
					email: email,
				},
				select: {
					email: true,
					password: true,
					id: true,
				},
			})

			if (!authData || !authData?.email || !authData?.email || !authData?.email)
				throw ErrorMsg.htmlError(htmlError[404])
			else return authData
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getByID(id: UserAuthID): Promise<{
		id: number
		email: string
		password: string
	}> {
		try {
			const authData = await this.userAuth.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					email: true,
					password: true,
					id: true,
				},
			})

			if (!authData || !authData?.email || !authData?.email || !authData?.email)
				throw ErrorMsg.htmlError(htmlError[404])
			else return authData
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}
}
