import { Release, Song } from "Domain"
import {
	GenreType,
	EntityID,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	ErrorMsg,
	IFile,
	SetPrivStatusReleaseReqDTO,
} from "Shared"
import { ToFormData, Response } from "../../assets"
import axios from "axios"
import { ReleasesRepository } from "Domain"

export class ReleasesImplement implements ReleasesRepository {
	async create(
		release: { data: Release; cover: IFile },
		songs: { data: Song; audio: IFile }[]
	): Promise<Response<INewReleaseSucc>> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, release.cover as IFile, "cover")
			ToFormData.object(formData, release.data, "release")

			songs.forEach((song, index) => {
				ToFormData.file(formData, song.audio as IFile, "song" + index + release.data.title)
				ToFormData.object(formData, song.data, "song" + index)
			})

			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.releases + apiUrlEndpt.releases.create}`,
				withCredentials: true,
				data: {
					release: release,
					songs: songs,
				},
			})) as Response<INewReleaseSucc>
		} catch (error) {
			return new Response<INewReleaseSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async edit(
		release: { data: Release; cover?: IFile | undefined },
		songs: Song[]
	): Promise<Response<boolean>> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, release.cover as IFile, "cover")
			ToFormData.object(formData, release.data, "release")

			songs.forEach((song, index) => {
				ToFormData.object(formData, song, "song" + index)
			})

			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.releases + apiUrlEndpt.releases.edit}`,
				withCredentials: true,
				data: formData,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async setPrivStatus(id: number, isPublic: boolean): Promise<Response<boolean>> {
		try {
			return (await axios({
				method: "patch",
				url: `${
					apiUrlRoot + apiUrlPath.releases + apiUrlEndpt.releases.setPrivStatus + id
				}`,
				withCredentials: true,
				data: { id: id, isPublic: isPublic } as SetPrivStatusReleaseReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async get(id: EntityID): Promise<Response<IReleaseSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.releases.oneByID + id}`,
				withCredentials: true,
			})) as Response<IReleaseSucc>
		} catch (error) {
			return new Response<IReleaseSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async getAll(): Promise<Response<IReleasesListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.releases.all}`,
				withCredentials: true,
			})) as Response<IReleasesListSucc>
		} catch (error) {
			return new Response<IReleasesListSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Response<IReleasesListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${
					apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.releases.manyByGenre + genre
				}`,
				withCredentials: true,
			})) as Response<IReleasesListSucc>
		} catch (error) {
			return new Response<IReleasesListSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async findManyByArtist(id: EntityID): Promise<Response<IReleasesListSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.releases.manyByArtist + id}`,
				withCredentials: true,
			})) as Response<IReleasesListSucc>
		} catch (error) {
			return new Response<IReleasesListSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}
}
