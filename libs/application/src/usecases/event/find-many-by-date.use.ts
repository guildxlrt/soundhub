import { UsecaseReply } from "../../utils"
import { ErrorHandler, EventShortDTO, IGetEventShortSuccess, envs } from "Shared"
import { ArtistsService, EventsService } from "../../services"
import { DateUsecaseParams } from "../params-adapters"

export class FindEventsByDateUsecase {
	mainService: EventsService
	artistsService?: ArtistsService

	constructor(mainService: EventsService, artistsService?: ArtistsService) {
		this.mainService = mainService
		this.artistsService = artistsService
	}

	async execute(input: DateUsecaseParams): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			if (envs.backend && this.artistsService)
				return await this.backend(input, this.artistsService)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: DateUsecaseParams): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const date = input.date

			const data = (await this.mainService.findManyByDate(date)) as EventShortDTO[]
			return new UsecaseReply<EventShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: DateUsecaseParams,
		artistsService: ArtistsService
	): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const date = input.date

			const data = (await this.mainService.findManyByDate(date)) as IGetEventShortSuccess[]

			const results: EventShortDTO[] = await Promise.all(
				data.map(async (event) => {
					// separate
					const { ["artists"]: artistsIDs, ...otherDatas } = event

					// get artists names
					const artists = await artistsService.getNames(artistsIDs)

					return { ...otherDatas, artists }
				})
			)

			return new UsecaseReply<EventShortDTO[]>(results, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
