import { UserAuthId, UserEmail, UserPassword } from "../../types"

export interface ILoginResServer {
	email: UserEmail
	password: UserPassword
	encryptedPass: string | undefined
	id: number | undefined
}

export type ILoginResClient = UserAuthId

export type ILoginRes = ILoginResServer | ILoginResClient
