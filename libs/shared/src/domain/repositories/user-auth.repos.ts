import { ILoginRes, ReplyLayer } from "../../utils"
import { ChangeEmailParams, ChangePassParams, LoginParams } from "../params"

export interface UserAuthsRepository {
	login(inputs: LoginParams): Promise<ReplyLayer<ILoginRes>>
	logout(): Promise<ReplyLayer<void>>
	changeEmail(inputs: ChangeEmailParams): Promise<ReplyLayer<boolean>>
	changePass(inputs: ChangePassParams): Promise<ReplyLayer<boolean>>
}
