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
	login(input: unknown): Promise<ILoginSucc>
	logout(): Promise<void>
	changeEmail(input: unknown): Promise<boolean>
	changePass(input: unknown): Promise<boolean>
}

export interface AuthBackendRepos {
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

export interface AuthFrontendRepos {}

export interface UserAuthsBackendRepos extends UserAuthsRepository, AuthBackendRepos {
	login(input: { data: unknown; userCookie: UserCookie }): Promise<ILoginSucc>
	changePass(input: { id: UserAuthID; pass: UserPassword }): Promise<boolean>
	changeEmail(input: { email: UserEmail; id: UserAuthID }): Promise<boolean>
}

export interface UserAuthsFrontendRepos extends UserAuthsRepository {
	login(input: { email: UserEmail; password: UserPassword }): Promise<ILoginSucc>
	changePass(input: {
		actual: UserPassword
		newPass: UserPassword
		confirm: UserPassword
	}): Promise<boolean>
	changeEmail(input: {
		actual: UserEmail
		newEmail: UserEmail
		confirm: UserEmail
	}): Promise<boolean>
}