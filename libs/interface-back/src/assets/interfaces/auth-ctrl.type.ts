export interface IAuthCtrl {
	login(req: unknown, res: unknown): Promise<unknown>
	logout(req: unknown, res: unknown): Promise<unknown>
	changeEmail(req: unknown, res: unknown): Promise<unknown>
	changePass(req: unknown, res: unknown): Promise<unknown>
}
