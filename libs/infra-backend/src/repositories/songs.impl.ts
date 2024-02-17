import { Song, SongsBackendRepos } from "Domain"
import {
	GenreType,
	RecordID,
	GetSongDTO,
	SongID,
	ArtistProfileID,
	IGetFullSongSuccess,
	ItemStatusEnum,
} from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class SongsImplement implements SongsBackendRepos {
	private song = dbClient.song

	async add(data: { song: Song; artists: ArtistProfileID[] }): Promise<boolean> {
		try {
			const { song, artists } = data
			const { title, lyrics, audioPath, record_id } = song

			// PERSIST
			await this.song.create({
				data: {
					status: ItemStatusEnum.draft,
					record_id: record_id as number,
					audioPath: audioPath as string,
					title: title,
					lyrics: lyrics,
					isReadOnly: false,
					songsFeats: {
						createMany: {
							data: artists.map((id) => {
								return {
									artist_id: id,
								}
							}),
						},
					},
				},
			})
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async edit(data: Song): Promise<boolean> {
		try {
			const { title, lyrics, id } = data

			// PERSIST
			await this.song.update({
				where: {
					id: id as number,
				},
				data: {
					title: title,
					lyrics: lyrics,
				},
			})
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async delete(id: SongID): Promise<boolean> {
		try {
			// PERSIST
			await this.song.delete({
				where: {
					id: id,
				},
			})
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async get(id: SongID): Promise<IGetFullSongSuccess> {
		try {
			const data = await this.song.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
					record_id: true,
					title: true,
					audioPath: true,
				},
			})

			// RESPONSE
			return data
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async search(
		recordID: RecordID,
		artistID: ArtistProfileID,
		genre: GenreType
	): Promise<GetSongDTO[]> {
		try {
			const songs = await this.song.findMany({
				where: {
					record_id: recordID,
					record: {
						genres: { has: genre },
						createdBy: artistID,
						status: ItemStatusEnum.public,
					},
				},
				select: {
					id: true,
					record_id: true,
					audioPath: true,
					title: true,
				},
			})

			// RESPONSE
			return GetSongDTO.createArrayFromData(songs)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async checkRights(id: number, createdBy: number): Promise<boolean> {
		return await this.song
			.findUnique({
				where: {
					id: id,
					status: ItemStatusEnum.draft,
				},
				select: { record: { select: { createdBy: true } } },
			})
			.then((data) => {
				if (createdBy !== data?.record.createdBy) return false
				else return true
			})
	}

	async getAudioPath(recordID: RecordID): Promise<string | null> {
		try {
			const { audioPath } = await this.song.findUniqueOrThrow({
				where: {
					id: recordID as number,
				},
				select: {
					audioPath: true,
				},
			})

			return audioPath
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getRecordID(id: SongID): Promise<number> {
		try {
			const { record_id } = await this.song.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					record_id: true,
				},
			})
			return record_id
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}
}
