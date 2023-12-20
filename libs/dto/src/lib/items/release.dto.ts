import { ArtistId, Release, ReleaseId } from "Domain"
import { GenreType } from "Shared-utils"
import { BasicDTO, INewPrice, INewRelease } from "../../assets"

// CREATE RELEASE
export class CreateReleaseDTO extends BasicDTO<INewRelease, boolean> {}

// MODIFY PRICE
export class ModifyReleasePriceDTO extends BasicDTO<INewPrice, boolean> {}

// GET ARTIST
export class GetReleaseDTO extends BasicDTO<ReleaseId, Release> {}

// GET ALL
export class GetAllReleasesDTO extends BasicDTO<void, Release[]> {}

// FIND MANY BY GENRE
export class FindReleasesByGenreDTO extends BasicDTO<GenreType, Release[]> {}

// FIND MANY BY ARTIST
export class FindReleasesByArtistDTO extends BasicDTO<ArtistId, Release[]> {}
