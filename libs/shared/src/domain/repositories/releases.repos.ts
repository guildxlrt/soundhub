import { INewReleaseSucc, ReplyLayer } from "../../utils"

export interface ReleasesRepository {
	create(inputs: unknown): Promise<ReplyLayer<INewReleaseSucc>>
	modify(inputs: unknown): Promise<ReplyLayer<boolean>>
	hide(inputs: unknown): Promise<ReplyLayer<boolean>>
	get(inputs: unknown): Promise<ReplyLayer<unknown>>
	getAll(): Promise<ReplyLayer<unknown[]>>
	findManyByArtist(inputs: unknown): Promise<ReplyLayer<unknown[]>>
	findManyByGenre(inputs: unknown): Promise<ReplyLayer<unknown[]>>
}
