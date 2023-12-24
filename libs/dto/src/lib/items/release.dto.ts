import { ArtistId, Release, ReleaseId } from "Domain"
import { GenreType } from "Shared-utils"
import { InputDTO, INewPrice, INewRelease, ReplyDTO } from "../../assets"

// CREATE RELEASE
export class CreateReleaseInputDTO extends InputDTO<INewRelease> {}
export class CreateReleaseReplyDTO extends ReplyDTO<boolean> {}

// MODIFY PRICE
export class ModifyReleasePriceInputDTO extends InputDTO<INewPrice> {}
export class ModifyReleasePriceReplyDTO extends ReplyDTO<boolean> {}

// GET ARTIST
export class GetReleaseInputDTO extends InputDTO<ReleaseId> {}
export class GetReleaseReplyDTO extends ReplyDTO<Release> {}

// GET ALL
export class GetAllReleasesInputDTO extends InputDTO<void> {}
export class GetAllReleasesReplyDTO extends ReplyDTO<Release[]> {}

// FIND MANY BY GENRE
export class FindReleasesByGenreInputDTO extends InputDTO<GenreType> {}
export class FindReleasesByGenreReplyDTO extends ReplyDTO<Release[]> {}

// FIND MANY BY ARTIST
export class FindReleasesByArtistInputDTO extends InputDTO<ArtistId> {}
export class FindReleasesByArtistReplyDTO extends ReplyDTO<Release[]> {}
