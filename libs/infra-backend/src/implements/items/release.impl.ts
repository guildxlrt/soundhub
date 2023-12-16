import { Release, ReleaseRepository } from "Domain"
import {
	CreateReleaseDTO,
	FindReleasesByArtistDTO,
	FindReleasesByGenreDTO,
	GetAllReleasesDTO,
	GetReleaseDTO,
	GetUserReleasesDTO,
	ModifyReleasePriceDTO,
} from "Dto"

export class ReleaseImplement implements ReleaseRepository {
	async create(inputs: CreateReleaseDTO): Promise<CreateReleaseDTO> {
		inputs.putInStorage(true)

		return inputs
	}

	async modifyPrice(inputs: ModifyReleasePriceDTO): Promise<ModifyReleasePriceDTO> {
		inputs.putInStorage(true)

		return inputs
	}

	async get(inputs: GetReleaseDTO): Promise<GetReleaseDTO> {
		const dbRes: any = {}

		inputs.putInStorage(dbRes)

		return inputs
	}

	async getAll(inputs: GetAllReleasesDTO): Promise<GetAllReleasesDTO> {
		const dbRes: Release[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}

	async findManyByGenre(inputs: FindReleasesByGenreDTO): Promise<FindReleasesByGenreDTO> {
		const dbRes: Release[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}

	async findManyByArtist(inputs: FindReleasesByArtistDTO): Promise<FindReleasesByArtistDTO> {
		const dbRes: Release[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}

	async getUserReleases(inputs: GetUserReleasesDTO): Promise<GetUserReleasesDTO> {
		const dbRes: Release[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}
}
