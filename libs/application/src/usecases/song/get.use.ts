import { UsecaseReply } from "../../utils"
import { ErrorHandler, GetFullSongDTO, IArtistName, IGetFullSongSuccess, envs } from "Shared"
import { SongsService, SongFeatService } from "../../services"
import { IDUsecaseParams } from "../../adapters"

export class GetSongUsecase {
	mainService: SongsService
	songFeatService?: SongFeatService

	constructor(mainService: SongsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetFullSongDTO>> {
		try {
			if (envs.backend && this.songFeatService)
				return await this.backend(input, this.songFeatService)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: IDUsecaseParams): Promise<UsecaseReply<GetFullSongDTO>> {
		try {
			const id = input.id
			const data = (await this.mainService.get(id)) as GetFullSongDTO
			return new UsecaseReply<GetFullSongDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: IDUsecaseParams,
		songFeatService: SongFeatService
	): Promise<UsecaseReply<GetFullSongDTO>> {
		try {
			const id = input.id
			// get the release
			const data = (await this.mainService.get(id)) as IGetFullSongSuccess

			// get artists names
			const feats: IArtistName[] = await songFeatService.getArtistsNamesOfSong(data.id)

			const dto = GetFullSongDTO.createFromData(data, feats)

			return new UsecaseReply<GetFullSongDTO>(dto, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
