import axios from "axios"
import { NewFormData, apiUrlPath, apiUrlRoot, apiUriRequest } from "../../assets"
import { Artist, RawFile, UserAuth } from "Domain"
import {
	GetArtistDTO,
	GetArtistShortDTO,
	GenreType,
	ArtistProfileID,
	ErrorHandler,
	UserEmail,
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
				url: `${apiUrlRoot + apiUrlPath.artists.signup}`,
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
				url: `${apiUrlRoot + apiUrlPath.artists.update}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setPublicStatus(): Promise<boolean> {
		try {
			return await axios({
				method: "patch",
				url: `${apiUrlRoot + apiUrlPath.artists.setPublicStatus}`,

				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getByID(id: ArtistProfileID): Promise<GetArtistDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists.getById + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getByEmail(email: UserEmail): Promise<GetArtistDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists.getByEmail + email}`,
				data: { email: email },
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<GetArtistShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists.getAll}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<GetArtistShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.genre + genre}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
