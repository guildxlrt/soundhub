import { BasicDTO, INewAnnounce } from "../../assets"
import { ArtistId, Announce, AnnounceId } from "Domain"

// CREATE POST
export class CreateAnnounceDTO extends BasicDTO<INewAnnounce, boolean> {}

// DELETE POST
export class DeleteAnnouncesDTO extends BasicDTO<AnnounceId, void> {}

// GET POST
export class GetAnnounceDTO extends BasicDTO<AnnounceId, Announce> {}

// GET ALL
export class GetAllAnnouncesDTO extends BasicDTO<void, Announce[]> {}

// FIND MANY BY ARTIST
export class FindAnnouncesByArtistDTO extends BasicDTO<ArtistId, Announce[]> {}
