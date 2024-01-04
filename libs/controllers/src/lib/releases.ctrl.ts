import { IReleasesController } from "../assets"
import {
	CreateReleaseInputDTO,
	FindReleasesByArtistInputDTO,
	FindReleasesByGenreInputDTO,
	GetReleaseInputDTO,
	ModifyReleasePriceInputDTO,
} from "Dto"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	FindReleasesByGenreUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	ModifyReleasePriceUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { errorMsg, ApiRequest, ApiReply } from "Shared-utils"
import { ctrlrErrHandler } from "../assets/error-handler"
import { GenreParams, IdParams, NewReleaseParams, Release, ReleasePriceParams, Song } from "Domain"
import { formatters } from "Operators"

export class ReleasesController implements IReleasesController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: CreateReleaseInputDTO = req.body as CreateReleaseInputDTO

			const { artist_id, title, releaseType, descript, price, genres } = inputs.release

			// Operators
			// genres
			const cleanGenres = formatters.genres(genres)

			// Saving Profile
			const release = new Release(
				undefined,
				artist_id,
				title,
				releaseType,
				descript,
				price,
				cleanGenres,
				null
			)
			const newSongsArray = inputs.songs.map((song) => {
				const { title, featuring, lyrics } = song
				return new Song(undefined, undefined, "placeholder", title, featuring, lyrics)
			})

			const createRelease = new CreateReleaseUsecase(databaseServices)
			const { data, error } = await createRelease.execute(
				new NewReleaseParams(release, newSongsArray)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async modifyPrice(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: ModifyReleasePriceInputDTO = req.body as ModifyReleasePriceInputDTO

			const { id, newAmount } = inputs

			// Saving Profile
			const modifyRelease = new ModifyReleasePriceUsecase(databaseServices)
			const { data, error } = await modifyRelease.execute(
				new ReleasePriceParams(id, newAmount)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: GetReleaseInputDTO = req.body as GetReleaseInputDTO
			const getRelease = new GetReleaseUsecase(databaseServices)
			const { data, error } = await getRelease.execute(new IdParams(inputs.id))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const getAllReleases = new GetAllReleasesUsecase(databaseServices)
			const { data, error } = await getAllReleases.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindReleasesByArtistInputDTO = req.body as FindReleasesByArtistInputDTO
			const findReleasesByArtist = new FindReleasesByArtistUsecase(databaseServices)
			const { data, error } = await findReleasesByArtist.execute(new IdParams(inputs.id))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindReleasesByGenreInputDTO = req.body as FindReleasesByGenreInputDTO
			const findReleasesByGenre = new FindReleasesByGenreUsecase(databaseServices)
			const { data, error } = await findReleasesByGenre.execute(new GenreParams(inputs))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}
}
