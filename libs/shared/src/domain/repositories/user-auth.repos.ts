import { ILoginRes, ReplyLayer } from "../../utils"

export interface UserAuthsRepository {
	login(inputs: unknown): Promise<ReplyLayer<ILoginRes>>
	logout(): Promise<ReplyLayer<void>>
	changeEmail(inputs: unknown): Promise<ReplyLayer<boolean>>
	changePass(inputs: unknown): Promise<ReplyLayer<boolean>>
}
