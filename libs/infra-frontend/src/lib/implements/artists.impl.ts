import {
	IArtistInfoSucc,
	IArtistsListSucc,
	INewArtistSucc,
	ArtistsRepository,
	EmailParams,
	GenreType,
	apiRoot,
	apiPath,
	apiEndpts,
	noStatus,
	ErrorMsg,
	CreateArtistReqDTO,
	ModifyArtistReqDTO,
	ArtistId,
	NewArtistParams,
	ModifyArtistParams,
} from "Shared"
import { Response } from "../../assets"
import axios from "axios"

export class ArtistsImplement implements ArtistsRepository {
	async create(inputs: NewArtistParams): Promise<Response<INewArtistSucc>> {
		try {
			return await axios({
				method: "post",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.create}`,
				withCredentials: true,
				data: inputs as CreateArtistReqDTO,
			})
		} catch (error) {
			return new Response<INewArtistSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async modify(inputs: ModifyArtistParams): Promise<Response<boolean>> {
		try {
			const { bio, genres, members, name } = inputs.profile

			return await axios({
				method: "post",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.create}`,
				withCredentials: true,
				data: {
					id: undefined,
					name: name,
					bio: bio,
					members: members,
					genres: genres,
					avatar: null,
				} as ModifyArtistReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async getById(id: ArtistId): Promise<Response<IArtistInfoSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.artists.oneById + id}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IArtistInfoSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async getByEmail(inputs: EmailParams): Promise<Response<IArtistInfoSucc>> {
		const { email } = inputs
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.artists.oneById}`,
				data: { email: email },
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IArtistInfoSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async getAll(): Promise<Response<IArtistsListSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.artists.all}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IArtistsListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Response<IArtistsListSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.artists.manyByGenre + genre}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IArtistsListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}
}
