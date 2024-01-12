import {
	GenreType,
	EntityId,
	NewReleaseParams,
	ModifyReleaseParams,
	ReleasesRepository,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	HideReleaseParams,
	apiRoot,
	apiPath,
	apiEndpts,
	ErrorMsg,
	noStatus,
	CreateReleaseReqDTO,
	ModifyReleaseReqDTO,
} from "Shared"
import { Response } from "../../assets"
import axios from "axios"

export class ReleasesImplement implements ReleasesRepository {
	async create(inputs: NewReleaseParams): Promise<Response<INewReleaseSucc>> {
		const { release, songs } = inputs
		try {
			return await axios({
				method: "put",
				url: `${apiRoot + apiPath.releases + apiEndpts.releases.create}`,
				withCredentials: true,
				data: {
					release: release,
					songs: songs,
				} as CreateReleaseReqDTO,
			})
		} catch (error) {
			return new Response<INewReleaseSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async modify(inputs: ModifyReleaseParams): Promise<Response<boolean>> {
		const { price, id } = inputs
		try {
			return await axios({
				method: "put",
				url: `${apiRoot + apiPath.releases + apiEndpts.releases.modify}`,
				withCredentials: true,
				data: { id: id, newAmount: price } as ModifyReleaseReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async hide(inputs: HideReleaseParams): Promise<Response<boolean>> {
		const { id } = inputs
		try {
			return await axios({
				method: "patch",
				url: `${apiRoot + apiPath.releases + apiEndpts.releases.hide + id}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async get(id: EntityId): Promise<Response<IReleaseSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.releases.oneById + id}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IReleaseSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async getAll(): Promise<Response<IReleasesListSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.releases.all}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IReleasesListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Response<IReleasesListSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.releases.manyByGenre + genre}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IReleasesListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}

	async findManyByArtist(id: EntityId): Promise<Response<IReleasesListSucc>> {
		try {
			return await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.releases.manyByArtist + id}`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<IReleasesListSucc>(
				undefined,
				new ErrorMsg(noStatus, "Error Calling API")
			)
		}
	}
}
