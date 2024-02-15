export interface IArtistsCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	update(req: unknown, res: unknown): Promise<unknown>
	setStatus(req: unknown, res: unknown): Promise<unknown>
	getByID(req: unknown, res: unknown): Promise<unknown>
	getByEmail(req: unknown, res: unknown): Promise<unknown>
	search(req: unknown, res: unknown): Promise<unknown>
}
