import { RawFile, Release, Song } from "Domain"
import {
	GenreType,
	EntityID,
	GetReleaseDTO,
	ReleaseShortDTO,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	ErrorHandler,
} from "Shared"
import { NewFormData } from "../../assets"
import axios from "axios"
import { ReleasesRepository } from "Domain"

export class ReleasesImplement implements ReleasesRepository {
	async create(
		release: { data: Release; cover: RawFile },
		songs: { data: Song; audio: RawFile }[]
	): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, release.cover, "cover")
			NewFormData.fromObject(formData, release.data, "release")

			songs.forEach((song, index) => {
				NewFormData.fromFile(formData, song.audio, "song" + index + release.data.title)
				NewFormData.fromObject(formData, song.data, "song" + index)
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
		release: { data: Release; cover?: RawFile | undefined },
		songs: Song[]
	): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, release.cover, "cover")
			NewFormData.fromObject(formData, release.data, "release")

			songs.forEach((song, index) => {
				NewFormData.fromObject(formData, song, "song" + index)
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

	async get(id: EntityID): Promise<GetReleaseDTO> {
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
	async findManyByDate(date: Date): Promise<ReleaseShortDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.artists + apiUrlEndpt.releases.manyByGenre + date}`,
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
