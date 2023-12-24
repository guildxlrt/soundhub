import { ArtistId, ReleaseId, Song } from "Domain"
import { InputDTO, INewSong, ReplyDTO } from "../../assets"

// CREATE SONG
export class NewSongInputDTO extends InputDTO<INewSong> {}
export class NewSongReplyDTO extends ReplyDTO<Song> {}

// GET SONG
export class GetSongInputDTO extends InputDTO<ReleaseId> {}
export class GetSongReplyDTO extends ReplyDTO<Song> {}

// FIND MANY BY ARTIST
export class FindSongsByArtistInputDTO extends InputDTO<ArtistId> {}
export class FindSongsByArtistReplyDTO extends ReplyDTO<Song[]> {}

// FIND MANY BY RELEASE
export class FindSongsByReleaseInputDTO extends InputDTO<ArtistId> {}
export class FindSongsByReleaseReplyDTO extends ReplyDTO<Song[]> {}
