import { INewReleaseSucc, IReleaseSucc, IReleasesListSucc, ReplyLayer } from "Shared"

export interface ReleasesRepository {
	create(inputs: unknown): Promise<ReplyLayer<INewReleaseSucc>>
	modify(inputs: unknown): Promise<ReplyLayer<boolean>>
	hide(inputs: unknown): Promise<ReplyLayer<boolean>>
	get(inputs: unknown): Promise<ReplyLayer<IReleaseSucc>>
	getAll(): Promise<ReplyLayer<IReleasesListSucc>>
	findManyByArtist(inputs: unknown): Promise<ReplyLayer<IReleasesListSucc>>
	findManyByGenre(inputs: unknown): Promise<ReplyLayer<IReleasesListSucc>>
}
