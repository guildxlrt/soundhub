import { GenreType, IArtistInfoSucc, IArtistsListSucc, INewArtistSucc, ReplyLayer } from "Shared"

export interface ArtistsRepository {
	create(inputs: unknown): Promise<ReplyLayer<INewArtistSucc>>
	modify(inputs: unknown): Promise<ReplyLayer<boolean>>
	getById(inputs: unknown): Promise<ReplyLayer<IArtistInfoSucc>>
	getByEmail(inputs: unknown): Promise<ReplyLayer<IArtistInfoSucc>>
	getAll(): Promise<ReplyLayer<IArtistsListSucc>>
	findManyByGenre(inputs: GenreType): Promise<ReplyLayer<IArtistsListSucc>>
}
