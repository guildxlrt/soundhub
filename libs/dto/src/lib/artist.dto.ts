import { ArtistId, GenreType, IModifyArtist, INewArtist, IArtist, ArtistsList } from "Shared-utils"
import { InputDTO, InputFileDTO, ReplyDTO } from "../assets"

// CREATE ARTIST
export class CreateArtistInputDTO extends InputFileDTO<INewArtist> {}
export class CreateArtistReplyDTO extends ReplyDTO<string> {}

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
export class GetAllArtistsInputDTO extends InputDTO<void> {}
export class GetAllArtistsReplyDTO extends ReplyDTO<ArtistsList> {}

// ARTISTS BY GENRE
export class FindArtistsByGenreInputDTO extends InputDTO<GenreType> {}
export class FindArtistsByGenreReplyDTO extends ReplyDTO<ArtistsList> {}
