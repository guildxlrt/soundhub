import { UserAuthID, UserEmail, UserPassword } from "Shared"

export interface UserAuthsRepository {
	login(email: unknown, password: unknown): Promise<boolean>
	logout(): Promise<boolean>
	changePass(input: {
		actual: UserPassword
		newOne: UserPassword
		confirm: UserPassword | null
		userAuthID?: UserAuthID
	}): Promise<boolean>
	changeEmail(input: {
		actual: UserEmail
		newOne: UserEmail
		confirm: UserEmail | null
		userAuthID?: UserAuthID
	}): Promise<boolean>
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
	changePass(input: {
		actual: UserPassword
		newOne: UserPassword
		confirm: UserPassword | null
		userAuthID: UserAuthID
	}): Promise<boolean>
	changeEmail(input: {
		actual: UserEmail
		newOne: UserEmail
		confirm: UserEmail | null
		userAuthID: UserAuthID
	}): Promise<boolean>
}

export interface UserAuthsFrontendRepos extends UserAuthsRepository {
	login(email: UserEmail, password: UserPassword): Promise<boolean>
	logout(): Promise<boolean>
}
