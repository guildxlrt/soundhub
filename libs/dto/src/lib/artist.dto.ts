import { ArtistId, GenreType, IModifyArtist, INewArtist, IArtist, IArtistsList } from "Shared-utils"
import { InputDTO, InputFileDTO, ReplyDTO } from "../assets"

// CREATE ARTIST
export class CreateArtistInputDTO extends InputFileDTO<INewArtist> {}
export class CreateArtistReplyDTO extends ReplyDTO<{ message: string; userAuthId: number }> {}

// MODIFY ARTIST
export class ModifyArtistInputDTO extends InputFileDTO<IModifyArtist> {}
export class ModifyArtistReplyDTO extends ReplyDTO<boolean> {}

// ARTIST BY ID
export class GetArtistByIdInputDTO extends InputDTO<ArtistId> {}
export class GetArtistByIdReplyDTO extends ReplyDTO<IArtist | null> {}

// ARTIST BY EMAIL
export class GetArtistByEmailInputDTO extends InputDTO<string> {}
export class GetArtistByEmailReplyDTO extends ReplyDTO<IArtist | null> {}

// GET ALL
export class GetAllArtistsReplyDTO extends ReplyDTO<IArtistsList> {}

// ARTISTS BY GENRE
export class FindArtistsByGenreInputDTO extends InputDTO<GenreType> {}
export class FindArtistsByGenreReplyDTO extends ReplyDTO<IArtistsList> {}
