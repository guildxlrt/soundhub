import axios from "axios"
import { ToFormData, Response } from "../../assets"
import { Artist, UserAuth } from "Domain"
import {
	ArtistShortDTO,
	ArtistShortestDTO,
	GenreType,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	ProfileID,
	IFile,
	ErrorHandler,
	ArtistDTO,
} from "Shared"
import { ArtistsRepository } from "Domain"

export class ArtistsImplement implements ArtistsRepository {
	async create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm: { confirmEmail: string; confirmPass: string }
		},
		file?: IFile
	): Promise<ArtistDTO> {
		try {
			const { profile, userAuth, authConfirm } = data

			const formData = new FormData()
			ToFormData.file(formData, file as IFile)
			ToFormData.object(formData, profile)
			ToFormData.object(formData, userAuth)
			ToFormData.object(formData, authConfirm)

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
			throw new ErrorHandler().handle(error)
		}
	}

	async update(data: { profile: Artist }, file?: IFile): Promise<boolean> {
		try {
			const { profile } = data

			const formData = new FormData()
			ToFormData.file(formData, file as IFile)
			ToFormData.object(formData, profile)

			return await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.create}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
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
			throw new ErrorHandler().handle(error)
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
			throw new ErrorHandler().handle(error)
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
			throw new ErrorHandler().handle(error)
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
			throw new ErrorHandler().handle(error)
		}
	}
}
