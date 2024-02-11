import { AnnouncesBackendRepos } from "Domain"
import { Announce } from "Domain"
import { AnnounceID, GetAnnounceDTO, GetAnnounceShortDTO } from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

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
			throw DatabaseErrorHandler.handle(error)
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
			throw DatabaseErrorHandler.handle(error)
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
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async get(id: AnnounceID): Promise<GetAnnounceDTO> {
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

			return GetAnnounceDTO.createFromData(announce)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<GetAnnounceShortDTO[]> {
		try {
			const announces = await this.announce.findMany({
				select: {
					id: true,
					owner_id: true,
					title: true,
					imagePath: true,
				},
			})

			return GetAnnounceShortDTO.createArrayFromData(announces)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByArtist(id: AnnounceID): Promise<GetAnnounceShortDTO[]> {
		try {
			const announces = await this.announce.findMany({
				where: {
					owner_id: id,
				},
				select: {
					id: true,
					owner_id: true,
					title: true,
					imagePath: true,
				},
			})

			return GetAnnounceShortDTO.createArrayFromData(announces)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByDate(date: Date) {
		try {
			const announces = await this.announce.findMany({
				where: {
					createdAt: date,
				},
				select: {
					id: true,
					owner_id: true,
					title: true,
					imagePath: true,
				},
			})

			return GetAnnounceShortDTO.createArrayFromData(announces)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getOwner(id: AnnounceID): Promise<number> {
		try {
			const { owner_id } = await this.announce.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					owner_id: true,
				},
			})
			return owner_id
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to authentificate")
		}
	}

	async getImagePath(id: AnnounceID): Promise<string | null> {
		try {
			const { imagePath } = await this.announce.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					imagePath: true,
				},
			})
			return imagePath
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error getting image path")
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
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}
}
