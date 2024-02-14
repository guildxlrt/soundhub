import { UsecaseReply } from "../../utils"
import { ErrorHandler, GetFullRecordDTO, IArtistName, IGetFullRecordSuccess, envs } from "Shared"
import { RecordArtistService, RecordsService, SongFeatService } from "../../services"
import { IDUsecaseParams } from "../../adapters"

export class GetRecordUsecase {
	mainService: RecordsService
	recordArtistService?: RecordArtistService
	songFeatService?: SongFeatService

	constructor(mainService: RecordsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetFullRecordDTO>> {
		try {
			if (envs.backend && this.recordArtistService && this.songFeatService)
				return await this.backend(input, this.recordArtistService, this.songFeatService)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: IDUsecaseParams): Promise<UsecaseReply<GetFullRecordDTO>> {
		try {
			const id = input.id
			const data = (await this.mainService.get(id)) as GetFullRecordDTO
			return new UsecaseReply<GetFullRecordDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: IDUsecaseParams,
		recordArtistService: RecordArtistService,
		songFeatService: SongFeatService
	): Promise<UsecaseReply<GetFullRecordDTO>> {
		try {
			const id = input.id
			// get the record
			const data = (await this.mainService.get(id)) as IGetFullRecordSuccess

			// get artists names
			const names: IArtistName[] = await recordArtistService.getArtistsNamesOfRecord(id)

			// get artists names
			const songsWithFeats = await Promise.all(
				data.songs.map(async (song) => {
					const feats = await songFeatService.getArtistsNamesOfSong(song.id)
					return { ...song, feats }
				})
			)

			const dto = GetFullRecordDTO.createFromData(data, names, songsWithFeats)

			return new UsecaseReply<GetFullRecordDTO>(dto, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
