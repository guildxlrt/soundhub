import { Song, SongRepository } from "Domain"
import { FindSongsByArtistDTO, FindSongsByReleaseDTO, GetSongDTO } from "Dto"

export class SongImplement implements SongRepository {
	async get(inputs: GetSongDTO): Promise<GetSongDTO> {
		const dbRes: any = {}

		inputs.putInStorage(dbRes)

		return inputs
	}

	async findManyByArtist(inputs: FindSongsByArtistDTO): Promise<FindSongsByArtistDTO> {
		const dbRes: Song[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}

	async findManyByRelease(inputs: FindSongsByReleaseDTO): Promise<FindSongsByReleaseDTO> {
		const dbRes: Song[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}
}
