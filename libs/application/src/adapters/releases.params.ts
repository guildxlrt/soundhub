import {
	EditReleaseDTO,
	GenresArray,
	PostReleaseDTO,
	ArtistProfileID,
	ReleaseID,
	ReleaseType,
} from "Shared"
import { StreamFile, Release } from "Domain"

export class NewReleaseUsecaseParams {
	data: Release
	artistsIDs: ArtistProfileID[]
	cover?: StreamFile

	constructor(data: Release, artistsIDs: ArtistProfileID[], cover?: StreamFile) {
		this.data = data
		this.cover = cover
		this.artistsIDs = artistsIDs
	}

	static fromBackend(dto: PostReleaseDTO, user: number, cover?: StreamFile | unknown) {
		const { title, releaseType, descript, price, genres, artistsIDs } = dto
		const releaseData = new Release(
			null,
			user,
			title,
			releaseType as ReleaseType,
			descript,
			price,
			genres as GenresArray,
			null,
			false,
			true
		)

		return new NewReleaseUsecaseParams(releaseData, artistsIDs, cover as StreamFile)
	}
}

export class EditReleaseUsecaseParams {
	data: Release
	cover?: StreamFile
	delCover?: boolean

	constructor(data: Release, cover?: StreamFile, delCover?: boolean) {
		this.data = data
		this.cover = cover
		this.delCover = delCover
	}

	static fromBackend(dto: EditReleaseDTO, userID: number, cover?: StreamFile | unknown) {
		const delCover = dto.delCover
		const { title, price, descript, genres, id } = dto.release
		const releaseData = new Release(
			id,
			userID,
			title,
			null,
			descript,
			price,
			genres as GenresArray,
			null,
			false,
			true
		)

		return new EditReleaseUsecaseParams(releaseData, cover as StreamFile, delCover)
	}
}

export class PatchDeleteUsecaseParams {
	id: ReleaseID
	ownerID?: ArtistProfileID

	constructor(id: ReleaseID, ownerID?: ArtistProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromBackend(id: number | string, ownerID: ArtistProfileID) {
		const releaseID = typeof id === "string" ? Number(id) : id
		return new PatchDeleteUsecaseParams(releaseID, ownerID)
	}
}
