import { UsecaseReply } from "../../utils"
import { ErrorHandler, GetFullReleaseDTO, IGetFullReleaseSuccess, envs } from "Shared"
import { ArtistsService, ReleasesService } from "../../services"
import { IDUsecaseParams } from "../params-adapters"

export class GetReleaseUsecase {
	mainService: ReleasesService
	artistsService?: ArtistsService

	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetFullReleaseDTO>> {
		try {
			if (envs.backend && this.artistsService)
				return await this.backend(input, this.artistsService)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: IDUsecaseParams): Promise<UsecaseReply<GetFullReleaseDTO>> {
		try {
			const id = input.id
			const data = (await this.mainService.get(id)) as GetFullReleaseDTO
			return new UsecaseReply<GetFullReleaseDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: IDUsecaseParams,
		artistsService: ArtistsService
	): Promise<UsecaseReply<GetFullReleaseDTO>> {
		try {
			const id = input.id
			// get the release
			const data = (await this.mainService.get(id)) as IGetFullReleaseSuccess

			// separate
			const { ["songs"]: songsData, ...release } = data

			// get artists names
			const songsWithArtistsNames = await Promise.all(
				songsData.map(async (song) => {
					const feats = artistsService.getNames(song.feats)

					return { ...song, feats }
				})
			)

			const dto = GetFullReleaseDTO.createFromData(release, songsWithArtistsNames)

			return new UsecaseReply<GetFullReleaseDTO>(dto, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
