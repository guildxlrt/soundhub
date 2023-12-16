import { ArtistId, ReleaseId, Song } from "Domain"
import { BasicDTO, INewSong } from "../../assets"

// CREATE SONG
export class NewSong extends BasicDTO<INewSong, Song> {}

// GET SONG
export class GetSongDTO extends BasicDTO<ReleaseId, Song> {}

// FIND MANY BY ARTIST
export class FindSongsByArtistDTO extends BasicDTO<ArtistId, Song[]> {}

// FIND MANY BY RELEASE
export class FindSongsByReleaseDTO extends BasicDTO<ArtistId, Song[]> {}
