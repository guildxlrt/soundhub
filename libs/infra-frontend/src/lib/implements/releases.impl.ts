import { Release, ReleasesRepository, Song } from "Domain"
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
	FileType,
	HideReleaseReqDTO,
} from "Shared"
import { ToFormData, Response } from "../../assets"
import axios from "axios"

export class ReleasesImplement implements ReleasesRepository {
	async create(
		release: { data: Release; cover: FileType },
		songs: { data: Song; audio: FileType }[]
	): Promise<Response<INewReleaseSucc>> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, release.cover as FileType, "cover")
			ToFormData.object(formData, release.data, "release")

			songs.forEach((song, index) => {
				ToFormData.file(
					formData,
					song.audio as FileType,
					"song" + index + release.data.title
				)
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
			return new Response<INewReleaseSucc>(
				undefined,
				new ErrorMsg(undefined, "Error Calling API")
			)
		}
	}

	async modify(
		release: { data: Release; cover?: FileType | undefined },
		songs: Song[]
	): Promise<Response<boolean>> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, release.cover as FileType, "cover")
			ToFormData.object(formData, release.data, "release")

			songs.forEach((song, index) => {
				ToFormData.object(formData, song, "song" + index)
			})

			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.releases + apiUrlEndpt.releases.modify}`,
				withCredentials: true,
				data: formData,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async hide(id: number, isPublic: boolean): Promise<Response<boolean>> {
		try {
			return (await axios({
				method: "patch",
				url: `${apiUrlRoot + apiUrlPath.releases + apiUrlEndpt.releases.hide + id}`,
				withCredentials: true,
				data: { id: id, isPublic: isPublic } as HideReleaseReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(undefined, new ErrorMsg(undefined, "Error Calling API"))
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
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.releases.all}`,
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
				url: `${
					apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.releases.manyByGenre + genre
				}`,
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
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.releases.manyByArtist + id}`,
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
