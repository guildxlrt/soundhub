import { Announce, AnnounceRepository } from "Domain"
import {
	CreateAnnounceDTO,
	DeleteAnnouncesDTO,
	FindAnnouncesByArtistDTO,
	GetAllAnnouncesDTO,
	GetAnnounceDTO,
} from "Dto"

export class AnnounceImplement implements AnnounceRepository {
	async create(inputs: CreateAnnounceDTO): Promise<CreateAnnounceDTO> {
		inputs.putInStorage(true)

		return inputs
	}

	async delete(inputs: DeleteAnnouncesDTO): Promise<DeleteAnnouncesDTO> {
		inputs.putInStorage()

		return inputs
	}

	async get(inputs: GetAnnounceDTO): Promise<GetAnnounceDTO> {
		const dbRes: any = {}

		inputs.putInStorage(dbRes)

		return inputs
	}

	async getAll(inputs: GetAllAnnouncesDTO): Promise<GetAllAnnouncesDTO> {
		const dbRes: Announce[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}

	async findManyByArtist(inputs: FindAnnouncesByArtistDTO): Promise<FindAnnouncesByArtistDTO> {
		const dbRes: Announce[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}
}
