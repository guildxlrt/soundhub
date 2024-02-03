import { Song, SongsBackendRepos } from "Domain"
import { GenreType, ProfileID, ReleaseID, SongDTO, SongID } from "Shared"
import { dbClient } from "../prisma"
import { DatabaseErrorHandler } from "../utils"

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
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByRelease(id: ReleaseID): Promise<SongDTO[]> {
		try {
			const songs = await this.song.findMany({
				where: {
					release_id: id,
					release: {
						isPublic: true,
					},
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
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByArtist(id: ProfileID): Promise<SongDTO[]> {
		try {
			const songs = await this.song.findMany({
				where: {
					feats: {
						has: id,
					},
					release: {
						owner_id: id,
						isPublic: true,
					},
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
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByReleaseGenre(genre: GenreType): Promise<SongDTO[]> {
		try {
			const songs = await this.song.findMany({
				where: {
					release: {
						genres: { has: genre },
						isPublic: true,
					},
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
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async update(data: Song): Promise<boolean> {
		try {
			const { title, feats, lyrics, id } = data

			// PERSIST
			await this.song.update({
				where: {
					id: id as number,
				},
				data: {
					title: title,
					feats: feats,
					lyrics: lyrics,
				},
			})
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}
}
