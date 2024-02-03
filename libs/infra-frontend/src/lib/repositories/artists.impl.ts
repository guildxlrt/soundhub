import axios from "axios"
import { NewFormData } from "../../assets"
import { Artist, RawFile, UserAuth } from "Domain"
import {
	ArtistShortDTO,
	ArtistShortestDTO,
	GenreType,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	ProfileID,
	ErrorHandler,
} from "Shared"
import { ArtistsRepository } from "Domain"

export class ArtistsImplement implements ArtistsRepository {
	async create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm: { confirmEmail: string; confirmPass: string }
		},
		file?: RawFile
	): Promise<boolean> {
		try {
			const { profile, userAuth, authConfirm } = data

			const formData = new FormData()
			NewFormData.fromFile(formData, file as RawFile)
			NewFormData.fromObject(formData, profile)
			NewFormData.fromObject(formData, userAuth)
			NewFormData.fromObject(formData, authConfirm)

			return await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.create}`,
				withCredentials: true,
				data: {
					profile: profile,
					auth: userAuth,
					authConfirm: authConfirm,
				},
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async update(data: Artist, delAvatar?: boolean, file?: RawFile): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, file as RawFile)
			NewFormData.fromObject(formData, data)

			return await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.create}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getByID(id: ProfileID): Promise<ArtistShortDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.artists.oneByID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getByEmail(email: string): Promise<ArtistShortDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.artists.oneByID}`,
				data: { email: email },
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<ArtistShortestDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.artists.all}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<ArtistShortestDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.artists.manyByGenre + genre}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
