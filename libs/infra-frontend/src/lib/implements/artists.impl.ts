import axios from "axios"
import { Response } from "../../assets"
import { ArtistsRepository } from "Domain"
import {
	IArtistInfoSucc,
	IArtistsListSucc,
	INewArtistSucc,
	EmailAdapter,
	GenreType,
	apiRoot,
	apiPath,
	apiEndpts,
	ErrorMsg,
	CreateArtistReqDTO,
	ModifyArtistReqDTO,
	ArtistID,
	NewArtistAdapter,
	ModifyArtistAdapter,
} from "Shared"

export class ArtistsImplement implements ArtistsRepository {
	async create(inputs: NewArtistAdapter): Promise<Response<INewArtistSucc>> {
		try {
			return (await axios({
				method: "post",
				url: `${apiRoot + apiPath.announces + apiEndpts.announces.create}`,
				withCredentials: true,
				data: inputs as CreateArtistReqDTO,
			})) as Response<INewArtistSucc>
		} catch (error) {
			return new Response<INewArtistSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async modify(inputs: ModifyArtistAdapter): Promise<Response<boolean>> {
		try {
			const { bio, genres, members, name } = inputs.profile

			return (await axios({
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
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async getByID(id: ArtistID): Promise<Response<IArtistInfoSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.artists.oneByID + id}`,
				withCredentials: true,
			})) as Response<IArtistInfoSucc>
		} catch (error) {
			return new Response<IArtistInfoSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async getByEmail(inputs: EmailAdapter): Promise<Response<IArtistInfoSucc>> {
		const { email } = inputs
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.artists.oneByID}`,
				data: { email: email },
				withCredentials: true,
			})) as Response<IArtistInfoSucc>
		} catch (error) {
			return new Response<IArtistInfoSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async getAll(): Promise<Response<IArtistsListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.artists.all}`,
				withCredentials: true,
			})) as Response<IArtistsListSucc>
		} catch (error) {
			return new Response<IArtistsListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Response<IArtistsListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.artists.manyByGenre + genre}`,
				withCredentials: true,
			})) as Response<IArtistsListSucc>
		} catch (error) {
			return new Response<IArtistsListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}
}
