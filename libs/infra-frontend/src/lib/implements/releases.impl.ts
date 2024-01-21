import { ReleasesRepository } from "Domain"
import {
	GenreType,
	EntityID,
	NewReleaseAdapter,
	ModifyReleaseAdapter,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	HideReleaseAdapter,
	apiRoot,
	apiPath,
	apiEndpts,
	ErrorMsg,
	CreateReleaseReqDTO,
	ModifyReleaseReqDTO,
} from "Shared"
import { Response } from "../../assets"
import axios from "axios"

export class ReleasesImplement implements ReleasesRepository {
	async create(inputs: NewReleaseAdapter): Promise<Response<INewReleaseSucc>> {
		const { release, songs } = inputs
		try {
			return (await axios({
				method: "put",
				url: `${apiRoot + apiPath.releases + apiEndpts.releases.create}`,
				withCredentials: true,
				data: {
					release: release,
					songs: songs,
				} as CreateReleaseReqDTO,
			})) as Response<INewReleaseSucc>
		} catch (error) {
			return new Response<INewReleaseSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async modify(inputs: ModifyReleaseAdapter): Promise<Response<boolean>> {
		const { price, id } = inputs
		try {
			return (await axios({
				method: "put",
				url: `${apiRoot + apiPath.releases + apiEndpts.releases.modify}`,
				withCredentials: true,
				data: { id: id, newAmount: price } as ModifyReleaseReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async hide(inputs: HideReleaseAdapter): Promise<Response<boolean>> {
		const { id } = inputs
		try {
			return (await axios({
				method: "patch",
				url: `${apiRoot + apiPath.releases + apiEndpts.releases.hide + id}`,
				withCredentials: true,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async get(id: EntityID): Promise<Response<IReleaseSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.releases.oneByID + id}`,
				withCredentials: true,
			})) as Response<IReleaseSucc>
		} catch (error) {
			return new Response<IReleaseSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async getAll(): Promise<Response<IReleasesListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.releases.all}`,
				withCredentials: true,
			})) as Response<IReleasesListSucc>
		} catch (error) {
			return new Response<IReleasesListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Response<IReleasesListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.artists + apiEndpts.releases.manyByGenre + genre}`,
				withCredentials: true,
			})) as Response<IReleasesListSucc>
		} catch (error) {
			return new Response<IReleasesListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async findManyByArtist(id: EntityID): Promise<Response<IReleasesListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.events + apiEndpts.releases.manyByArtist + id}`,
				withCredentials: true,
			})) as Response<IReleasesListSucc>
		} catch (error) {
			return new Response<IReleasesListSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}
}
