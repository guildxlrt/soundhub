import { ArtistId, GenreType, IModifyArtist, INewArtist, IArtist } from "Shared-utils"
import { InputDTO, ReplyDTO } from "../assets"

// CREATE ARTIST
export class CreateArtistInputDTO extends InputDTO<INewArtist> {}
export class CreateArtistReplyDTO extends ReplyDTO<string> {}

// MODIFY ARTIST
export class ModifyArtistInputDTO extends InputDTO<IModifyArtist> {}
export class ModifyArtistReplyDTO extends ReplyDTO<boolean> {}

// ARTIST BY ID
export class GetArtistByIdInputDTO extends InputDTO<ArtistId> {}
export class GetArtistByIdReplyDTO extends ReplyDTO<IArtist> {}

// ARTIST BY EMAIL
export class GetArtistByEmailInputDTO extends InputDTO<string> {}
export class GetArtistByEmailReplyDTO extends ReplyDTO<IArtist> {}

// GET ALL
export class GetAllArtistsInputDTO extends InputDTO<void> {}
export class GetAllArtistsReplyDTO extends ReplyDTO<IArtist[]> {}

// ARTISTS BY GENRE
export class FindArtistsByGenreInputDTO extends InputDTO<GenreType> {}
export class FindArtistsByGenreReplyDTO extends ReplyDTO<IArtist[]> {}
