import { UsecaseReply } from "../../utils"
import { ErrorHandler, GetFullRecordDTO, IArtistName, IGetFullRecordSuccess, envs } from "Shared"
import {
	RecordArtistService,
	RecordLabelService,
	RecordsService,
	SongFeatService,
} from "../../services"
import { IDUsecaseParams } from "../../adapters"

export class GetRecordUsecase {
	mainService: RecordsService
	recordArtistService?: RecordArtistService
	songFeatService?: SongFeatService
	recordLabelService?: RecordLabelService

	constructor(mainService: RecordsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetFullRecordDTO>> {
		try {
			if (
				envs.backend &&
				this.recordArtistService &&
				this.songFeatService &&
				this.recordLabelService
			)
				return await this.backend(
					input,
					this.recordArtistService,
					this.songFeatService,
					this.recordLabelService
				)
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
		songFeatService: SongFeatService,
		recordLabelService: RecordLabelService
	): Promise<UsecaseReply<GetFullRecordDTO>> {
		try {
			const id = input.id
			// get the record
			const data = (await this.mainService.get(id)) as IGetFullRecordSuccess

			// get artists names
			const names: IArtistName[] = await recordArtistService.getArtistsNames(id)

			// get artists names
			const songsWithFeats = await Promise.all(
				data.songs.map(async (song) => {
					const feats = await songFeatService.getArtistsNames(song.id)
					return { ...song, feats }
				})
			)

			// get label name
			const labelName = await recordLabelService.getLabelName(id)

			const dto = GetFullRecordDTO.createFromData(data, labelName, names, songsWithFeats)

			return new UsecaseReply<GetFullRecordDTO>(dto, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
