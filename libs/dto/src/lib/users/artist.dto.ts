import { Artist, ArtistId } from "Domain"
import { GenreType } from "Shared-utils"
import { InputDTO, IModifyArtist, INewArtist, ReplyDTO } from "../../assets"

// CREATE ARTIST
export class CreateArtistInputDTO extends InputDTO<INewArtist> {}
export class CreateArtistReplyDTO extends ReplyDTO<boolean> {}

// MODIFY ARTIST
export class ModifyArtistInputDTO extends InputDTO<IModifyArtist> {}
export class ModifyArtistReplyDTO extends ReplyDTO<boolean> {}

// ARTIST BY ID
export class GetArtistByIdInputDTO extends InputDTO<ArtistId> {}
export class GetArtistByIdReplyDTO extends ReplyDTO<Artist> {}

// ARTIST BY EMAIL
export class GetArtistByEmailInputDTO extends InputDTO<string> {}
export class GetArtistByEmailReplyDTO extends ReplyDTO<Artist> {}

// GET ALL
export class GetAllArtistsInputDTO extends InputDTO<void> {}
export class GetAllArtistsReplyDTO extends ReplyDTO<Artist[]> {}

// ARTISTS BY GENRE
export class FindArtistsByGenreInputDTO extends InputDTO<GenreType> {}
export class FindArtistsByGenreReplyDTO extends ReplyDTO<Artist[]> {}
