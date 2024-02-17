export interface IEventsCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	edit(req: unknown, res: unknown): Promise<unknown>
	delete(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
}
