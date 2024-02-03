import { AnyObject, ProfileID, UserAuthID, UserEmail, UserPassword } from "Shared"

export interface UserAuthsRepository {
	login(email: unknown, password: unknown): Promise<boolean>
	logout(): Promise<boolean>
	changePass(input: AnyObject): Promise<boolean>
	changeEmail(input: AnyObject): Promise<boolean>
}

export interface ExtBackUserAuthsRepos {
	getByEmail(email: UserEmail): Promise<{
		id: UserAuthID
		email: UserEmail
		password: UserPassword
	}>
	getByID(id: UserAuthID): Promise<{
		id: UserAuthID
		email: UserEmail
		password: UserPassword
	}>
}

export interface ExtFrontUserAuthsRepos {}

export interface UserAuthsBackendRepos extends UserAuthsRepository, ExtBackUserAuthsRepos {
	changePass(input: { id: ProfileID; pass: UserPassword }): Promise<boolean>
	changeEmail(input: { id: ProfileID; email: UserEmail }): Promise<boolean>
}

export interface UserAuthsFrontendRepos extends UserAuthsRepository {
	changePass(input: {
		actual: UserPassword
		newOne: UserPassword
		confirm: UserPassword | null
		userAuthID: UserAuthID
	}): Promise<boolean>
	login(email: UserEmail, password: UserPassword): Promise<boolean>
	logout(): Promise<boolean>
}
