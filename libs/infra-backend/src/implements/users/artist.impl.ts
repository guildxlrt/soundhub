import { Artist, ArtistRepository } from "Domain"
import {
	CreateArtistDTO,
	ModifyArtistDTO,
	FindArtistsByGenreDTO,
	GetAllArtistsDTO,
	GetArtistByEmailDTO,
	GetArtistByIdDTO,
} from "Dto"

export class ArtistImplement implements ArtistRepository {
	async create(inputs: CreateArtistDTO): Promise<CreateArtistDTO> {
		inputs.putInStorage(true)

		return inputs
	}

	async modify(inputs: ModifyArtistDTO): Promise<ModifyArtistDTO> {
		inputs.putInStorage(true)

		return inputs
	}

	async getById(inputs: GetArtistByIdDTO): Promise<GetArtistByIdDTO> {
		const dbRes: any = {}

		inputs.putInStorage(dbRes)

		return inputs
	}

	async getByEmail(inputs: GetArtistByEmailDTO): Promise<GetArtistByEmailDTO> {
		const dbRes: any = {}

		inputs.putInStorage(dbRes)

		return inputs
	}

	async getAll(inputs: GetAllArtistsDTO): Promise<GetAllArtistsDTO> {
		const dbRes: Artist[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}

	async findManyByGenre(inputs: FindArtistsByGenreDTO): Promise<FindArtistsByGenreDTO> {
		const dbRes: Artist[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}
}
