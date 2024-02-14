import { UsecaseReply } from "../../utils"
import { ErrorHandler, GetFullReleaseDTO, IArtistName, IGetFullReleaseSuccess, envs } from "Shared"
import { ReleaseArtistService, ReleasesService, SongFeatService } from "../../services"
import { IDUsecaseParams } from "../../adapters"

export class GetReleaseUsecase {
	mainService: ReleasesService
	releaseArtistService?: ReleaseArtistService
	songFeatService?: SongFeatService

	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetFullReleaseDTO>> {
		try {
			if (envs.backend && this.releaseArtistService && this.songFeatService)
				return await this.backend(input, this.releaseArtistService, this.songFeatService)
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
		releaseArtistService: ReleaseArtistService,
		songFeatService: SongFeatService
	): Promise<UsecaseReply<GetFullReleaseDTO>> {
		try {
			const id = input.id
			// get the release
			const data = (await this.mainService.get(id)) as IGetFullReleaseSuccess

			// get artists names
			const names: IArtistName[] = await releaseArtistService.getArtistsNamesOfRelease(id)

			// get artists names
			const songsWithFeats = await Promise.all(
				data.songs.map(async (song) => {
					const feats = await songFeatService.getArtistsNamesOfSong(song.id)
					return { ...song, feats }
				})
			)

			const dto = GetFullReleaseDTO.createFromData(data, names, songsWithFeats)

			return new UsecaseReply<GetFullReleaseDTO>(dto, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
