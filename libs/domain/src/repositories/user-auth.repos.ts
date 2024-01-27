import { ArtistID, ILoginSucc, ReplyLayer, UserAuthID, UserEmail, UserPassword } from "Shared"

export interface UserAuthsRepository {
	login(input: unknown): Promise<ReplyLayer<ILoginSucc>>
	logout(): Promise<ReplyLayer<void>>
	changeEmail(input: unknown): Promise<ReplyLayer<boolean>>
	changePass(input: unknown): Promise<ReplyLayer<boolean>>
}

export interface AuthRepository {
	login(input: { id: UserAuthID; profile: ArtistID }): Promise<ReplyLayer<ILoginSucc>>
	changePass(input: { id: UserAuthID; pass: UserPassword }): Promise<ReplyLayer<boolean>>
	changeEmail(input: { email: UserEmail; id: UserAuthID }): Promise<ReplyLayer<boolean>>
	getByEmail(email: UserEmail): Promise<{
		id: number
		email: string
		password: string
	}>
	getByID(id: number): Promise<{
		id: number
		email: string
		password: string
	}>
	compareIDs(databaseID: UserAuthID, inputedID: UserAuthID): Promise<boolean>
	comparePass(encryptedPass: UserPassword, inputedPass: UserPassword): Promise<boolean>
	compareEmails(dbEmail: UserEmail, inputedEmail: UserEmail): Promise<boolean>
}

export interface UserAuthsFrontendRepos extends UserAuthsRepository {
	login(input: { email: string; password: string }): Promise<ReplyLayer<ILoginSucc>>
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
