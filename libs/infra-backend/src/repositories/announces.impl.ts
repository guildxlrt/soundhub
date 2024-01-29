import { AnnouncesBackendRepos } from "Domain"
import { Announce } from "Domain"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	IAnnouncesListItemSucc,
	AnnounceID,
	ErrorHandler,
} from "Shared"
import { dbClient } from "../database"

export class AnnouncesImplement implements AnnouncesBackendRepos {
	private announce = dbClient.announce

	async create(data: Announce): Promise<boolean> {
		try {
			const { owner_id, title, text, imagePath } = data

			if (imagePath) {
				await this.announce.create({
					data: {
						owner_id: owner_id as number,
						title: title,
						text: text,
						imagePath: imagePath,
					},
				})
			} else {
				await this.announce.create({
					data: {
						owner_id: owner_id as number,
						title: title,
						text: text,
					},
				})
			}

			// RESPO NSE
			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(data: Announce): Promise<boolean> {
		try {
			const { owner_id, title, text, id, imagePath } = data

			if (imagePath || imagePath === null) {
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
			} else {
				await this.announce.update({
					where: {
						id: id as number,
						owner_id: owner_id,
					},
					data: {
						title: title,
						text: text,
					},
				})
			}

			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: AnnounceID): Promise<void> {
		try {
			await this.announce.delete({
				where: {
					id: id,
				},
			})

			return
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: AnnounceID): Promise<IAnnounceSucc> {
		try {
			const announce = await this.announce.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					owner_id: true,
					title: true,
					text: true,
					imagePath: true,
				},
			})

			return {
				id: id,
				owner_id: id,
				title: announce?.title,
				text: announce?.text,
				imagePath: announce?.imagePath,
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<IAnnouncesListSucc> {
		try {
			const announces = await this.announce.findMany({
				select: {
					id: true,
					owner_id: true,
					title: true,
					imagePath: true,
				},
			})

			// Reorganize
			return announces.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					owner_id: announce.owner_id,
					title: announce.title,
					imagePath: announce.imagePath,
				}
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByArtist(id: AnnounceID): Promise<IAnnouncesListSucc> {
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

			// Reorganize
			return announces.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					owner_id: announce.owner_id,
					title: announce.title,
					imagePath: announce.imagePath,
				}
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
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
			throw ErrorHandler.handle(error).setMessage("error to authentificate")
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
			throw ErrorHandler.handle(error).setMessage("error getting image path")
		}
	}
}
