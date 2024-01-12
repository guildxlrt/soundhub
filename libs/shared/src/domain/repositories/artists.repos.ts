import { GenreType, ReplyLayer } from "../../utils"
import { EmailParams } from "../params"

export interface ArtistsRepository {
	create(inputs: unknown): Promise<ReplyLayer<unknown>>
	modify(inputs: unknown): Promise<ReplyLayer<boolean>>
	getById(inputs: unknown): Promise<ReplyLayer<unknown>>
	getByEmail(inputs: EmailParams): Promise<ReplyLayer<unknown>>
	getAll(): Promise<ReplyLayer<unknown[]>>
	findManyByGenre(inputs: GenreType): Promise<ReplyLayer<unknown[]>>
}
