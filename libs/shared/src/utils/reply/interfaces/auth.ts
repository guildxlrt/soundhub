import { UserAuthId, UserCookie, UserEmail, UserPassword } from "../../types"

export interface ILoginResServer {
	email: UserEmail
	password: UserPassword
	encryptedPass: string | undefined
	userCookie: UserCookie
}

export type ILoginResClient = UserAuthId

export type ILoginRes = ILoginResServer | ILoginResClient
