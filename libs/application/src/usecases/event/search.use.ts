import { UsecaseReply } from "../../utils"
import { ErrorHandler, GetEventShortDTO, IGetEventShortSuccess, envs } from "Shared"
import { ArtistsService, EventsService } from "../../services"

export class SearchEventsUsecase {
	mainService: EventsService
	artistsService?: ArtistsService

	constructor(mainService: EventsService, artistsService?: ArtistsService) {
		this.mainService = mainService
		this.artistsService = artistsService
	}

	async execute(date: Date, place: string): Promise<UsecaseReply<GetEventShortDTO[]>> {
		try {
			if (envs.backend && this.artistsService)
				return await this.backend({ date, place }, this.artistsService)
			else return await this.frontend(date, place)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(date: Date, place: string): Promise<UsecaseReply<GetEventShortDTO[]>> {
		try {
			const data = (await this.mainService.search(date, place)) as GetEventShortDTO[]
			return new UsecaseReply<GetEventShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: { date: Date; place: string },
		artistsService: ArtistsService
	): Promise<UsecaseReply<GetEventShortDTO[]>> {
		try {
			const { date, place } = input

			const data = (await this.mainService.search(date, place)) as IGetEventShortSuccess[]

			const results: GetEventShortDTO[] = await Promise.all(
				data.map(async (event) => {
					// separate
					const { ["artists"]: artistsIDs, ...otherDatas } = event

					// get artists names
					const artists = await artistsService.getNames(artistsIDs)

					return { ...otherDatas, artists }
				})
			)

			return new UsecaseReply<GetEventShortDTO[]>(results, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
