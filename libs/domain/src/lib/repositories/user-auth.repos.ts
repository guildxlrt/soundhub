import { Cookie, ReplyLayer, UserAuthID } from "Shared"

export interface UserAuthsRepository {
	login(email: string, password: string): Promise<ReplyLayer<Cookie>>
	logout(): Promise<ReplyLayer<void>>
	changeEmail(
		data: { actual: string; newEmail: string; confirm?: string },
		id?: UserAuthID
	): Promise<ReplyLayer<boolean>>
	changePass(
		data: { actual: string; newPass: string; confirm?: string },
		id?: UserAuthID,
		hashedPass?: string
	): Promise<ReplyLayer<boolean>>
}
