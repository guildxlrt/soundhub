import { ArtistId, GenreType, INewPrice, INewRelease, IRelease, ReleaseId } from "Shared-utils"
import { InputDTO, ReplyDTO } from "../assets"

// CREATE RELEASE
export class CreateReleaseInputDTO extends InputDTO<INewRelease> {}
export class CreateReleaseReplyDTO extends ReplyDTO<boolean> {}

// MODIFY PRICE
export class ModifyReleasePriceInputDTO extends InputDTO<INewPrice> {}
export class ModifyReleasePriceReplyDTO extends ReplyDTO<boolean> {}

// GET ARTIST
export class GetReleaseInputDTO extends InputDTO<ReleaseId> {}
export class GetReleaseReplyDTO extends ReplyDTO<IRelease> {}

// GET ALL
export class GetAllReleasesInputDTO extends InputDTO<void> {}
export class GetAllReleasesReplyDTO extends ReplyDTO<IRelease[]> {}

// FIND MANY BY GENRE
export class FindReleasesByGenreInputDTO extends InputDTO<GenreType> {}
export class FindReleasesByGenreReplyDTO extends ReplyDTO<IRelease[]> {}

// FIND MANY BY ARTIST
export class FindReleasesByArtistInputDTO extends InputDTO<ArtistId> {}
export class FindReleasesByArtistReplyDTO extends ReplyDTO<IRelease[]> {}
