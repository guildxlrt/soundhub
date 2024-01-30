import { Song, SongsBackendRepos } from "Domain"
import { ReleaseID, SongDTO, SongID } from "Shared"
import { dbClient } from "../prisma"
import { ApiErrHandler } from "../utils"

export class SongsImplement implements SongsBackendRepos {
	private song = dbClient.song

	async get(id: SongID): Promise<SongDTO> {
		try {
			const songs = await this.song.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
					release_id: true,
					title: true,
					audioPath: true,
				},
			})

			// RESPONSE
			return SongDTO.createFromData(songs)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async findByRelease(id: ReleaseID): Promise<SongDTO[]> {
		try {
			const songs = await this.song.findMany({
				where: {
					release_id: id,
				},
				select: {
					id: true,
					release_id: true,
					audioPath: true,
					title: true,
				},
			})

			// RESPONSE
			return SongDTO.createArrayFromData(songs)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async update(data: Song): Promise<boolean> {
		try {
			const { title, featuring, lyrics, id } = data

			// PERSIST
			await this.song.update({
				where: {
					id: id as number,
				},
				data: {
					title: title,
					featuring: featuring,
					lyrics: lyrics,
				},
			})
			return true
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}
}
