export interface IReleasesCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	edit(req: unknown, res: unknown): Promise<unknown>
	delete(req: unknown, res: unknown): Promise<unknown>
	publish(req: unknown, res: unknown): Promise<unknown>
	setPublicStatus(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
}
