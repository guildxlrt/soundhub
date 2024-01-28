import axios from "axios"
import { ToFormData, Response } from "../../assets"
import { Artist, UserAuth } from "Domain"
import {
	IArtistInfoSucc,
	IArtistsListSucc,
	INewArtistSucc,
	GenreType,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	ErrorMsg,
	ProfileID,
	IFile,
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
	): Promise<Response<INewArtistSucc>> {
		try {
			const { profile, userAuth, authConfirm } = data

			const formData = new FormData()
			ToFormData.file(formData, file as IFile)
			ToFormData.object(formData, profile)
			ToFormData.object(formData, userAuth)
			ToFormData.object(formData, authConfirm)

			return (await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.create}`,
				withCredentials: true,
				data: {
					profile: profile,
					auth: userAuth,
					authConfirm: authConfirm,
				},
			})) as Response<INewArtistSucc>
		} catch (error) {
			return new Response<INewArtistSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async update(data: { profile: Artist }, file?: IFile): Promise<Response<boolean>> {
		try {
			const { profile } = data

			const formData = new FormData()
			ToFormData.file(formData, file as IFile)
			ToFormData.object(formData, profile)

			return (await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.announces.create}`,
				withCredentials: true,
				data: formData,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async getByID(id: ProfileID): Promise<Response<IArtistInfoSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.artists.oneByID + id}`,
				withCredentials: true,
			})) as Response<IArtistInfoSucc>
		} catch (error) {
			return new Response<IArtistInfoSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async getByEmail(email: string): Promise<Response<IArtistInfoSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.artists.oneByID}`,
				data: { email: email },
				withCredentials: true,
			})) as Response<IArtistInfoSucc>
		} catch (error) {
			return new Response<IArtistInfoSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async getAll(): Promise<Response<IArtistsListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.artists.all}`,
				withCredentials: true,
			})) as Response<IArtistsListSucc>
		} catch (error) {
			return new Response<IArtistsListSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Response<IArtistsListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.artists.manyByGenre + genre}`,
				withCredentials: true,
			})) as Response<IArtistsListSucc>
		} catch (error) {
			return new Response<IArtistsListSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}
}
