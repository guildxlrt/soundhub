export interface IArtistCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	update(req: unknown, res: unknown): Promise<unknown>
	setPublicStatus(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	getByID(req: unknown, res: unknown): Promise<unknown>
	getByEmail(req: unknown, res: unknown): Promise<unknown>
}
