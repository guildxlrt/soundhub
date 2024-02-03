import { PlaceUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorHandler, EventShortDTO, IGetEventShortSuccess, envs } from "Shared"
import { ArtistsService, EventsService } from "../../services"

export class FindEventsByPlaceUsecase {
	mainService: EventsService
	artistsService?: ArtistsService

	constructor(mainService: EventsService, artistsService?: ArtistsService) {
		this.mainService = mainService
		this.artistsService = artistsService
	}

	async execute(input: PlaceUsecaseParams): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			if (envs.backend && this.artistsService)
				return await this.backend(input, this.artistsService)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: PlaceUsecaseParams): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const place = input.place

			const data = (await this.mainService.findManyByPlace(place)) as EventShortDTO[]
			return new UsecaseReply<EventShortDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: PlaceUsecaseParams,
		artistsService: ArtistsService
	): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const place = input.place

			const data = (await this.mainService.findManyByPlace(place)) as IGetEventShortSuccess[]

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
