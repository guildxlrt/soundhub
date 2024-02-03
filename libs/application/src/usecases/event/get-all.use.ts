import { UsecaseReply } from "../../utils"
import { ErrorHandler, EventShortDTO, IGetEventShortSuccess, envs } from "Shared"
import { ArtistsService, EventsService } from "../../services"

export class GetAllEventsUsecase {
	mainService: EventsService
	artistsService?: ArtistsService

	constructor(mainService: EventsService, artistsService?: ArtistsService) {
		this.mainService = mainService
		this.artistsService = artistsService
	}

	async execute(): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			if (envs.backend && this.artistsService) return await this.backend(this.artistsService)
			else return await this.frontend()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const data = (await this.mainService.getAll()) as EventShortDTO[]
			return new UsecaseReply<EventShortDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(artistsService: ArtistsService): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const data = (await this.mainService.getAll()) as IGetEventShortSuccess[]

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
