import { Release, Song } from "Domain"
import {
	GenreType,
	EntityID,
	ReleaseDTO,
	ReleaseShortDTO,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	ErrorMsg,
	IFile,
	ErrorHandler,
} from "Shared"
import { ToFormData, Response } from "../../assets"
import axios from "axios"
import { ReleasesRepository } from "Domain"

export class ReleasesImplement implements ReleasesRepository {
	async create(
		release: { data: Release; cover: IFile },
		songs: { data: Song; audio: IFile }[]
	): Promise<boolean> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, release.cover as IFile, "cover")
			ToFormData.object(formData, release.data, "release")

			songs.forEach((song, index) => {
				ToFormData.file(formData, song.audio as IFile, "song" + index + release.data.title)
				ToFormData.object(formData, song.data, "song" + index)
			})

			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.releases + apiUrlEndpt.releases.create}`,
				withCredentials: true,
				data: {
					release: release,
					songs: songs,
				},
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async edit(
		release: { data: Release; cover?: IFile | undefined },
		songs: Song[]
	): Promise<boolean> {
		try {
			const formData = new FormData()
			ToFormData.file(formData, release.cover as IFile, "cover")
			ToFormData.object(formData, release.data, "release")

			songs.forEach((song, index) => {
				ToFormData.object(formData, song, "song" + index)
			})

			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.releases + apiUrlEndpt.releases.edit}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async setPrivStatus(id: number, isPublic: boolean): Promise<boolean> {
		try {
			return await axios({
				method: "patch",
				url: `${
					apiUrlRoot + apiUrlPath.releases + apiUrlEndpt.releases.setPrivStatus + id
				}`,
				withCredentials: true,
				data: { id: id, isPublic: isPublic },
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async get(id: EntityID): Promise<ReleaseDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.releases.oneByID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async getAll(): Promise<ReleaseShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.releases.all}`,
				withCredentials: true,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<ReleaseShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${
					apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.releases.manyByGenre + genre
				}`,
				withCredentials: true,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async findManyByArtist(id: EntityID): Promise<ReleaseShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.events + apiUrlEndpt.releases.manyByArtist + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
