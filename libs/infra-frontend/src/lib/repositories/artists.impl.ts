import axios from "axios"
import { NewFormData, apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"
import { Artist, RawFile, UserAuth } from "Domain"
import {
	GetArtistDTO,
	GetArtistShortDTO,
	GenreType,
	ArtistProfileID,
	ErrorHandler,
	UserEmail,
} from "Shared"
import { ArtistsFrontendRepos } from "Domain"

export class ArtistsImplement implements ArtistsFrontendRepos {
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

			const url: string = apiUrlRoot + apiUrlPath.artists.signup

			return await axios({
				method: "post",
				url: url,
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

	async update(data: Artist, deleteLogo?: boolean, file?: RawFile): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, file as RawFile)
			NewFormData.fromObject(formData, data)

			const url: string = apiUrlRoot + apiUrlPath.artists.update

			return await axios({
				method: "post",
				url: url,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setStatus(): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.artists.setStatus

			return await axios({
				method: "patch",
				url: url,

				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getByID(id: ArtistProfileID): Promise<GetArtistDTO> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.artists.getById + id

			return await axios({
				method: "get",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getByEmail(email: UserEmail): Promise<GetArtistDTO> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.artists.getByEmail + email

			return await axios({
				method: "get",
				url: url,
				data: { email: email },
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async search(genre: GenreType, country: string): Promise<GetArtistShortDTO[]> {
		try {
			const url: string =
				apiUrlRoot +
				apiUrlPath.search +
				apiUriQuery.genre +
				genre +
				apiUriQuery.country +
				country

			return await axios({
				method: "get",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
