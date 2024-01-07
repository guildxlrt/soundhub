import { ReplyLayer } from "Shared-utils"
import { ChangeEmailParams, ChangePassParams, LoginParams } from "./params"

export interface UserAuthsRepository {
	login(inputs: LoginParams): Promise<ReplyLayer<Credential>>
	logout(): Promise<ReplyLayer<unknown>>
	changeEmail(inputs: ChangeEmailParams): Promise<ReplyLayer<boolean>>
	changePass(inputs: ChangePassParams): Promise<ReplyLayer<boolean>>
}
