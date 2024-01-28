import {
	ILoginSucc,
	ProfileID,
	ReplyLayer,
	UserAuthID,
	UserEmail,
	UserPassword,
	UserProfileType,
} from "Shared"
import { UserCookie } from "../entities"

export interface UserAuthsRepository {
	login(input: unknown): Promise<ReplyLayer<ILoginSucc>>
	logout(): Promise<ReplyLayer<void>>
	changeEmail(input: unknown): Promise<ReplyLayer<boolean>>
	changePass(input: unknown): Promise<ReplyLayer<boolean>>
}

export interface AuthRepository {
	genCookie(id: UserAuthID, profile: ProfileID, profileType: UserProfileType): Promise<UserCookie>
	getByEmail(email: UserEmail): Promise<{
		id: number
		email: UserEmail
		password: UserPassword
	}>
	getByID(id: UserAuthID): Promise<{
		id: number
		email: UserEmail
		password: UserPassword
	}>
	compareIDs(databaseID: UserAuthID, inputedID: UserAuthID): Promise<boolean>
	comparePass(encryptedPass: UserPassword, inputedPass: UserPassword): Promise<boolean>
	compareEmails(dbEmail: UserEmail, inputedEmail: UserEmail): Promise<boolean>
	hashPass(pass: UserPassword): Promise<string>
}

export interface UserAuthsBackendRepos extends UserAuthsRepository, AuthRepository {
	login(input: { data: unknown; userCookie: UserCookie }): Promise<ReplyLayer<ILoginSucc>>
	changePass(input: { id: UserAuthID; pass: UserPassword }): Promise<ReplyLayer<boolean>>
	changeEmail(input: { email: UserEmail; id: UserAuthID }): Promise<ReplyLayer<boolean>>
}

export interface UserAuthsFrontendRepos extends UserAuthsRepository {
	login(input: { email: UserEmail; password: UserPassword }): Promise<ReplyLayer<ILoginSucc>>
	changePass(input: {
		actual: UserPassword
		newPass: UserPassword
		confirm: UserPassword
	}): Promise<ReplyLayer<boolean>>
	changeEmail(input: {
		actual: UserEmail
		newEmail: UserEmail
		confirm: UserEmail
	}): Promise<ReplyLayer<boolean>>
}
