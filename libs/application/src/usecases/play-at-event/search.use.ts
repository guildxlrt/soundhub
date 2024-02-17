import { UsecaseReply } from "../../utils"
import { ErrorHandler, GenreType, GetEventShortDTO, IGetEventShortSuccess, envs } from "Shared"
import { ArtistsService, PlayAtEventService } from "../../services"

export class SearchPlayAtEventUsecase {
	mainService: PlayAtEventService
	artistsService?: ArtistsService

	constructor(mainService: PlayAtEventService, artistsService?: ArtistsService) {
		this.mainService = mainService
		this.artistsService = artistsService
	}

	async execute(id: number, genre: GenreType): Promise<UsecaseReply<GetEventShortDTO[]>> {
		try {
			if (envs.backend && this.artistsService)
				return await this.backend(id, genre, this.artistsService)
			else return await this.frontend(id, genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(id: number, genre: GenreType): Promise<UsecaseReply<GetEventShortDTO[]>> {
		try {
			const data = (await this.mainService.search(id, genre)) as GetEventShortDTO[]
			return new UsecaseReply<GetEventShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		id: number,
		genre: GenreType,
		artistsService: ArtistsService
	): Promise<UsecaseReply<GetEventShortDTO[]>> {
		try {
			const data = (await this.mainService.search(id, genre)) as IGetEventShortSuccess[]

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
