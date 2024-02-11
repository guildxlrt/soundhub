import { RawFile, Release } from "Domain"
import {
	GenreType,
	EntityID,
	GetFullReleaseDTO,
	GetShortReleaseDTO,
	ErrorHandler,
	ArtistProfileID,
	ReleaseID,
	ReleaseType,
} from "Shared"
import { NewFormData, apiUriRequest, apiUrlPath, apiUrlRoot } from "../../assets"
import axios from "axios"
import { ReleasesRepository } from "Domain"

export class ReleasesImplement implements ReleasesRepository {
	async create(release: { data: Release; cover: RawFile }): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, release.cover, "cover")
			NewFormData.fromObject(formData, release.data, "release")

			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.releases.create}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(release: { data: Release; cover?: RawFile | undefined }): Promise<boolean> {
		try {
			const { id } = release.data

			const formData = new FormData()
			NewFormData.fromFile(formData, release?.cover as RawFile, "cover")
			NewFormData.fromObject(formData, release.data, "release")

			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.releases.edit + id}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: ReleaseID): Promise<boolean> {
		try {
			return await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.releases.delete + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async publish(id: ReleaseID): Promise<boolean> {
		try {
			return await axios({
				method: "patch",
				url: `${apiUrlRoot + apiUrlPath.releases.publish + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setPublicStatus(id: ReleaseID, isPublic: boolean): Promise<boolean> {
		try {
			return await axios({
				method: "patch",
				url: `${apiUrlRoot + apiUrlPath.releases.setPublicStatus + id}`,

				withCredentials: true,
				data: { id: id, isPublic: isPublic },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: EntityID): Promise<GetFullReleaseDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.releases.get + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<GetShortReleaseDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.releases.getAll}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<GetShortReleaseDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.genre + genre}`,

				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByDate(date: Date): Promise<GetShortReleaseDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.date + date}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByArtist(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.artistID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByArtistFeats(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.artistFeatsID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByReleaseType(type: ReleaseType): Promise<GetShortReleaseDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.releaseType + type}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
