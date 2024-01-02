import { IArtist } from "../interfaces"

export type ArtistsListItem = Omit<IArtist, "bio" | "members">

export type ArtistsList = ArtistsListItem[]
