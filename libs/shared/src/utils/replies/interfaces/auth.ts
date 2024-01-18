import { UserAuthId, UserEmail, UserPassword } from "../../entities"
import { UserCookie } from "../../types"

export interface ILoginResServer {
	email: UserEmail
	password: UserPassword
	encryptedPass: string | undefined
	userCookie: UserCookie
}

export type ILoginResClient = UserAuthId

export type ILoginRes = ILoginResServer | ILoginResClient
