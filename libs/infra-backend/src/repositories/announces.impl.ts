import { AnnouncesBackendRepos } from "Domain"
import { Announce } from "Domain"
import { Reply } from "../utils"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	ErrorMsg,
	IAnnouncesListItemSucc,
	AnnounceID,
	htmlError,
} from "Shared"
import { dbClient } from "../database"

export class AnnouncesImplement implements AnnouncesBackendRepos {
	private announce = dbClient.announce

	async create(data: Announce): Promise<Reply<boolean>> {
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
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))

			return res
		}
	}

	async edit(data: Announce): Promise<Reply<boolean>> {
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

			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))

			return res
		}
	}

	async delete(id: AnnounceID): Promise<Reply<void>> {
		try {
			await this.announce.delete({
				where: {
					id: id,
				},
			})

			return new Reply<void>()
		} catch (error) {
			const res = new Reply<void>(undefined, new ErrorMsg(`Error: failed to delete`, 500))

			return res
		}
	}

	async get(id: AnnounceID): Promise<Reply<IAnnounceSucc>> {
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

			return new Reply<IAnnounceSucc>({
				id: id,
				owner_id: id,
				title: announce?.title,
				text: announce?.text,
				imagePath: announce?.imagePath,
			})
		} catch (error) {
			return new Reply<IAnnounceSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async getAll(): Promise<Reply<IAnnouncesListSucc>> {
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
			const list = announces.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					owner_id: announce.owner_id,
					title: announce.title,
					imagePath: announce.imagePath,
				}
			})

			return new Reply<IAnnouncesListSucc>(list)
		} catch (error) {
			return new Reply<IAnnouncesListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async findManyByArtist(id: AnnounceID): Promise<Reply<IAnnouncesListSucc>> {
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
			const list = announces.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					owner_id: announce.owner_id,
					title: announce.title,
					imagePath: announce.imagePath,
				}
			})

			return new Reply<IAnnouncesListSucc>(list)
		} catch (error) {
			return new Reply<IAnnouncesListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
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
			throw new ErrorMsg("Error verifying auths", 500).treatError(error)
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
			throw new ErrorMsg("Error verifying auths", 500).treatError(error)
		}
	}
}
