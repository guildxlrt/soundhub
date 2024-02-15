export interface IRecordsCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	edit(req: unknown, res: unknown): Promise<unknown>
	delete(req: unknown, res: unknown): Promise<unknown>
	setStatus(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
	search(req: unknown, res: unknown): Promise<unknown>
}
