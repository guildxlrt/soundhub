import { AnnouncesBackendRepos } from "Domain"
import { Announce } from "Domain"
import {
	AnnounceID,
	ArtistProfileID,
	GetAnnounceDTO,
	GetAnnounceShortDTO,
	ItemStatusEnum,
} from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class AnnouncesImplement implements AnnouncesBackendRepos {
	private announce = dbClient.announce

	async create(data: Announce): Promise<boolean> {
		try {
			const { createdBy, title, text, imagePath } = data

			await this.announce.create({
				data: {
					status: ItemStatusEnum.public,
					createdBy: createdBy as number,
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
			const { createdBy, title, text, id, imagePath } = data

			await this.announce.update({
				where: {
					id: id as number,
					createdBy: createdBy,
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
					createdBy: true,
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

	async search(id: ArtistProfileID, date: Date): Promise<GetAnnounceShortDTO[]> {
		try {
			const announces = await this.announce.findMany({
				where: {
					createdBy: id,
					createdAt: date,
				},
				select: {
					id: true,
					createdBy: true,
					title: true,
					imagePath: true,
				},
			})

			return GetAnnounceShortDTO.createArrayFromData(announces)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async checkRights(id: number, createdBy: number): Promise<boolean> {
		return await this.announce
			.findUnique({
				where: {
					id: id,
					status: ItemStatusEnum.draft || ItemStatusEnum.public,
					createdBy: createdBy,
				},
			})
			.then((data) => {
				if (!data) return false
				else return true
			})
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
