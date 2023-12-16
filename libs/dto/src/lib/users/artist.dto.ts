import { Artist, ArtistId } from "Domain"
import { GenreType } from "Shared-utils"
import { BasicDTO, IModifyArtist, INewArtist } from "../../assets"

// CREATE ARTIST
export class CreateArtistDTO extends BasicDTO<INewArtist, boolean> {}

// MODIFY ARTIST
export class ModifyArtistDTO extends BasicDTO<IModifyArtist, boolean> {}

// GET ALL
export class GetAllArtistsDTO extends BasicDTO<void, Artist[]> {}

// ARTISTS BY GENRE
export class FindArtistsByGenreDTO extends BasicDTO<GenreType, Artist[]> {}

// ARTIST BY ID
export class GetArtistByIdDTO extends BasicDTO<ArtistId, Artist> {}

// ARTIST BY EMAIL
export class GetArtistByEmailDTO extends BasicDTO<string, Artist> {}
