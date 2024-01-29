import { Song, SongsBackendRepos } from "Domain"
import { SongID, ISongSucc, ErrorHandler } from "Shared"
import { dbClient } from "../database"

export class SongsImplement implements SongsBackendRepos {
	private song = dbClient.song

	async get(id: SongID): Promise<ISongSucc> {
		try {
			const song = await this.song.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					release_id: true,
					audioPath: true,
					title: true,
					featuring: true,
					lyrics: true,
				},
			})

			// RESPONSE
			return {
				id: id,
				release_id: song?.release_id,
				audioPath: song?.audioPath,
				title: song?.title,
				featuring: song?.featuring,
				lyrics: song?.lyrics,
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async update(data: Song): Promise<void> {
		try {
			const { title, featuring, lyrics, audioPath, release_id } = data

			// PERSIST
			await this.song.create({
				data: {
					release_id: release_id as number,
					audioPath: audioPath as string,
					title: title,
					featuring: featuring,
					lyrics: lyrics,
				},
			})
			return
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
