import { AnnouncesImplement } from "./announces.impl"
import { ArtistsImplement } from "./artists.impl"
import { EventsImplement } from "./events.impl"
import { ReleasesImplement } from "./releases.impl"
import { SongsImplement } from "./songs.impl"
import { UserAuthsImplement } from "./user-auths.impl"

export * from "./user-auths.impl"
export * from "./artists.impl"
export * from "./releases.impl"
export * from "./songs.impl"
export * from "./announces.impl"
export * from "./events.impl"

export const apiRepos = {
	userAuths: new UserAuthsImplement(),
	artists: new ArtistsImplement(),
	releases: new ReleasesImplement(),
	songs: new SongsImplement(),
	announces: new AnnouncesImplement(),
	events: new EventsImplement(),
}

export type ApiRepos = typeof apiRepos
