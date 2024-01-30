import { AnnouncesBackendRepos } from "Domain"
import { Announce } from "Domain"
import { AnnounceID, AnnounceDTO, AnnounceShortDTO } from "Shared"
import { dbClient } from "../prisma"
import { ApiErrHandler } from "../utils"

export class AnnouncesImplement implements AnnouncesBackendRepos {
	private announce = dbClient.announce

	async create(data: Announce): Promise<boolean> {
		try {
			const { owner_id, title, text, imagePath } = data

			await this.announce.create({
				data: {
					owner_id: owner_id as number,
					title: title,
					text: text,
					imagePath: imagePath,
				},
			})

			// RESPO NSE
			return true
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async edit(data: Announce): Promise<boolean> {
		try {
			const { owner_id, title, text, id, imagePath } = data

			await this.announce.update({
				where: {
					id: id as number,
					owner_id: owner_id,
				},
				data: {
					title: title,
					text: text,
					imagePath: imagePath,
				},
			})

			return true
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async delete(id: AnnounceID): Promise<boolean> {
		try {
			await this.announce.delete({
				where: {
					id: id,
				},
			})

			return true
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async get(id: AnnounceID): Promise<AnnounceDTO> {
		try {
			const announce = await this.announce.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
					owner_id: true,
					title: true,
					text: true,
					imagePath: true,
				},
			})

			return AnnounceDTO.createFromData(announce)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async getAll(): Promise<AnnounceShortDTO[]> {
		try {
			const announces = await this.announce.findMany({
				select: {
					id: true,
					owner_id: true,
					title: true,
					imagePath: true,
				},
			})

			return AnnounceShortDTO.createArrayFromData(announces)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async findManyByArtist(id: AnnounceID): Promise<AnnounceShortDTO[]> {
		try {
			const profileID = id

			const announces = await this.announce.findMany({
				where: {
					owner_id: profileID,
				},
				select: {
					id: true,
					owner_id: true,
					title: true,
					imagePath: true,
				},
			})

			return AnnounceShortDTO.createArrayFromData(announces)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async getOwner(id: AnnounceID): Promise<number> {
		try {
			const announce = await this.announce.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					owner_id: true,
				},
			})
			return announce?.owner_id
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error).setMessage("error to authentificate")
		}
	}

	async getImagePath(id: AnnounceID): Promise<string | null> {
		try {
			const announce = await this.announce.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					imagePath: true,
				},
			})
			return announce?.imagePath
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error).setMessage("error getting image path")
		}
	}

	async setImagePath(path: string | null, id: AnnounceID): Promise<boolean> {
		try {
			await this.announce.update({
				where: {
					id: id,
				},
				data: {
					imagePath: path,
				},
			})
			return true
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error).setMessage("error to get image path")
		}
	}
}
