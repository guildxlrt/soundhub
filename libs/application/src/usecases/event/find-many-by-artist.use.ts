import { IDUsecaseParams, UsecaseReply } from "../../utils"
import {
	ErrorHandler,
	EventShortDTO,
	IGetArtistNameSuccess,
	IGetEventShortSuccess,
	envs,
} from "Shared"
import { ArtistsService, EventsService } from "../../services"

export class FindEventsByArtistUsecase {
	mainService: EventsService
	artistsService?: ArtistsService

	constructor(mainService: EventsService, artistsService?: ArtistsService) {
		this.mainService = mainService
		this.artistsService = artistsService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			if (envs.backend && this.artistsService)
				return await this.backend(input, this.artistsService)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: IDUsecaseParams): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const id = input.id

			const data = (await this.mainService.findManyByArtist(id)) as EventShortDTO[]
			return new UsecaseReply<EventShortDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: IDUsecaseParams,
		artistsService: ArtistsService
	): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const id = input.id

			const data = (await this.mainService.findManyByArtist(id)) as IGetEventShortSuccess[]

			const results: EventShortDTO[] = await Promise.all(
				data.map(async (event) => {
					// separate
					const { ["artists"]: artistsIDs, ...otherDatas } = event

					// get artists names
					const artists = await artistsService.getNames(artistsIDs)

					return { ...otherDatas, artists }
				})
			)

			return new UsecaseReply<EventShortDTO[]>(results)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
