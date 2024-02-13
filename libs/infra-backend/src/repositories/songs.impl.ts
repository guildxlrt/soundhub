import { Song, SongsBackendRepos } from "Domain"
import { GenreType, ReleaseID, GetSongDTO, SongID, ArtistProfileID } from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class SongsImplement implements SongsBackendRepos {
	private song = dbClient.song

	async add(song: Song): Promise<boolean> {
		try {
			const { title, lyrics, audioPath, release_id } = song

			// PERSIST
			await this.song.create({
				data: {
					release_id: release_id as number,
					audioPath: audioPath as string,
					title: title,

					lyrics: lyrics,
					isReadOnly: false,
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

	async findSongsInArtistReleases(id: ArtistProfileID): Promise<GetSongDTO[]> {
		try {
			const songs = await this.song.findMany({
				where: {
					release: {
						publisher_id: id,
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

	async getEditability(id: SongID): Promise<boolean> {
		try {
			const { isReadOnly } = await this.song.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					isReadOnly: true,
				},
			})
			return isReadOnly
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getAudioPath(releaseID: ReleaseID): Promise<string | null> {
		try {
			const { audioPath } = await this.song.findUniqueOrThrow({
				where: {
					id: releaseID as number,
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

	async getReleaseID(id: SongID): Promise<number> {
		try {
			const { release_id } = await this.song.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					release_id: true,
				},
			})
			return release_id
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}
}
