import {
	EventID,
	EventDTO,
	EventShortDTO,
	UserAuthID,
	GenreType,
	IFindManyByArtistGenreSuccess,
	IGetEventShortSuccess,
	IGetEventSuccess,
} from "Shared"
import { Event, File, RawFile, StreamFile } from "Domain"

export interface EventsRepository {
	create(data: Event, file?: File): Promise<boolean>
	edit(data: Event, file?: File): Promise<boolean>
	delete(id: EventID, userAuth?: UserAuthID): Promise<boolean>
	get(id: EventID): Promise<unknown>
	getAll(): Promise<unknown[]>
	findManyByArtist(id: EventID): Promise<unknown[]>
	findManyByArtistGenre(genre: GenreType): Promise<unknown[]>
	findManyByDate(date: Date): Promise<unknown[]>
	findManyByPlace(place: string): Promise<unknown[]>
}

export interface ExtBackEventsRepos {
	getOwner(id: EventID): Promise<number | undefined>
	getImagePath(id: EventID): Promise<string | null | undefined>
	setImagePath(path: string | null, id: EventID): Promise<boolean>
}

export interface ExtFrontEventsRepos {}

export interface EventsBackendRepos extends EventsRepository, ExtBackEventsRepos {
	create(data: Event, file?: StreamFile): Promise<boolean>
	edit(data: Event, file?: StreamFile): Promise<boolean>
	get(id: EventID): Promise<IGetEventSuccess>
	getAll(): Promise<IGetEventShortSuccess[]>
	findManyByArtist(id: EventID): Promise<IGetEventShortSuccess[]>
	findManyByArtistGenre(genre: GenreType): Promise<IFindManyByArtistGenreSuccess>
	findManyByDate(date: Date): Promise<IGetEventShortSuccess[]>
	findManyByPlace(place: string): Promise<IGetEventShortSuccess[]>
}
export interface EventsFrontendRepos extends EventsRepository, ExtFrontEventsRepos {
	create(data: Event, file?: RawFile): Promise<boolean>
	edit(data: Event, file?: RawFile): Promise<boolean>
	get(id: EventID): Promise<EventDTO>
	getAll(): Promise<EventShortDTO[]>
	findManyByArtist(id: EventID): Promise<EventShortDTO[]>
	findManyByArtistGenre(genre: GenreType): Promise<EventShortDTO[]>
	findManyByDate(date: Date): Promise<EventShortDTO[]>
	findManyByPlace(place: string): Promise<EventShortDTO[]>
}
