export interface ILabelsCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	edit(req: unknown, res: unknown): Promise<unknown>
	setStatus(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
}
