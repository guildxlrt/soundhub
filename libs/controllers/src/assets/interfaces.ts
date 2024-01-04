export interface IAuthController {
	login(req: unknown, res: unknown): Promise<unknown>
	logout(req: unknown, res: unknown): Promise<unknown>
	changeEmail(req: unknown, res: unknown): Promise<unknown>
	changePass(req: unknown, res: unknown): Promise<unknown>
}

export interface IArtistController {
	create(req: unknown, res: unknown): Promise<unknown>
	modify(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	getById(req: unknown, res: unknown): Promise<unknown>
	getByEmail(req: unknown, res: unknown): Promise<unknown>
	findManyByGenre(req: unknown, res: unknown): Promise<unknown>
}

export interface IReleasesController {
	create(req: unknown, res: unknown): Promise<unknown>
	modifyPrice(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	findManyByArtist(req: unknown, res: unknown): Promise<unknown>
	findManyByGenre(req: unknown, res: unknown): Promise<unknown>
}

export interface ISongsController {
	get(req: unknown, res: unknown): Promise<unknown>
}

export interface IAnnoncesController {
	create(req: unknown, res: unknown): Promise<unknown>
	delete(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	findManyByArtist(req: unknown, res: unknown): Promise<unknown>
}

export interface IEventsController {
	create(req: unknown, res: unknown): Promise<unknown>
	delete(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	findManyByArtist(req: unknown, res: unknown): Promise<unknown>
	findManyByDate(req: unknown, res: unknown): Promise<unknown>
	findManyByLocation(req: unknown, res: unknown): Promise<unknown>
}
