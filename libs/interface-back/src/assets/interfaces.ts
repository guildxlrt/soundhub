export interface IAuthCtrl {
	login(req: unknown, res: unknown): Promise<unknown>
	logout(req: unknown, res: unknown): Promise<unknown>
	changeEmail(req: unknown, res: unknown): Promise<unknown>
	changePass(req: unknown, res: unknown): Promise<unknown>
}

export interface IArtistCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	modify(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	getById(req: unknown, res: unknown): Promise<unknown>
	getByEmail(req: unknown, res: unknown): Promise<unknown>
	findManyByGenre(req: unknown, res: unknown): Promise<unknown>
}

export interface IReleasesCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	modify(req: unknown, res: unknown): Promise<unknown>
	hide(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	findManyByArtist(req: unknown, res: unknown): Promise<unknown>
	findManyByGenre(req: unknown, res: unknown): Promise<unknown>
}

export interface ISongsCtrl {
	get(req: unknown, res: unknown): Promise<unknown>
}

export interface IAnnoncesCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	modify(req: unknown, res: unknown): Promise<unknown>
	delete(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	findManyByArtist(req: unknown, res: unknown): Promise<unknown>
}

export interface IEventsCtrl {
	create(req: unknown, res: unknown): Promise<unknown>
	modify(req: unknown, res: unknown): Promise<unknown>
	delete(req: unknown, res: unknown): Promise<unknown>
	get(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	findManyByArtist(req: unknown, res: unknown): Promise<unknown>
	findManyByDate(req: unknown, res: unknown): Promise<unknown>
	findManyByPlace(req: unknown, res: unknown): Promise<unknown>
}
