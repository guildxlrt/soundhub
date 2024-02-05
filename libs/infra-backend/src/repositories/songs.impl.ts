import { Song, SongsBackendRepos } from "Domain"
import { GenreType, ArtistProfileID, ReleaseID, GetSongDTO, SongID } from "Shared"
import { dbClient } from "../prisma"
import { DatabaseErrorHandler } from "../utils"

export class SongsImplement implements SongsBackendRepos {
	private song = dbClient.song

	async get(id: SongID): Promise<GetSongDTO> {
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
			return GetSongDTO.createFromData(songs)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByRelease(id: ReleaseID): Promise<GetSongDTO[]> {
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
			return GetSongDTO.createArrayFromData(songs)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByArtist(id: ArtistProfileID): Promise<GetSongDTO[]> {
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
			return GetSongDTO.createArrayFromData(songs)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByReleaseGenre(genre: GenreType): Promise<GetSongDTO[]> {
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
			return GetSongDTO.createArrayFromData(songs)
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
