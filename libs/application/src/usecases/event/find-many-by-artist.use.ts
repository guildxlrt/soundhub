import { UsecaseReply } from "../../utils"
import { ErrorHandler, GetEventShortDTO, IGetEventShortSuccess, envs } from "Shared"
import { ArtistsService, EventsService } from "../../services"
import { IDUsecaseParams } from "../../adapters"

export class FindEventsByArtistUsecase {
	mainService: EventsService
	artistsService?: ArtistsService

	constructor(mainService: EventsService, artistsService?: ArtistsService) {
		this.mainService = mainService
		this.artistsService = artistsService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetEventShortDTO[]>> {
		try {
			if (envs.backend && this.artistsService)
				return await this.backend(input, this.artistsService)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: IDUsecaseParams): Promise<UsecaseReply<GetEventShortDTO[]>> {
		try {
			const id = input.id

			const data = (await this.mainService.findManyByArtist(id)) as GetEventShortDTO[]
			return new UsecaseReply<GetEventShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: IDUsecaseParams,
		artistsService: ArtistsService
	): Promise<UsecaseReply<GetEventShortDTO[]>> {
		try {
			const id = input.id

			const data = (await this.mainService.findManyByArtist(id)) as IGetEventShortSuccess[]

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
