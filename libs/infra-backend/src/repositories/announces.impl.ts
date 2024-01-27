import { AnnouncesRepository } from "Domain"
import { Announce } from "Domain"
import { Reply, FileManipulator, filePath } from "../utils"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	ErrorMsg,
	IAnnouncesListItemSucc,
	AnnounceID,
	UserAuthID,
	FileType,
	htmlError,
} from "Shared"
import { GetID, dbClient } from "../database"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(data: Announce, file?: FileType): Promise<Reply<boolean>> {
		try {
			const { owner_id, title, text } = data

			// STORING FILE
			const fileOrigin = filePath.origin.image + file?.filename
			const fileStore = filePath.store.announce + file?.filename
			await FileManipulator.move(fileOrigin, fileStore)

			await dbClient.announce.create({
				data: {
					owner_id: owner_id as number,
					title: title,
					text: text,
					imagePath: fileStore,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))

			return res
		}
	}

	async edit(data: Announce, file?: FileType): Promise<Reply<boolean>> {
		try {
			const { owner_id, title, text, id } = data

			// owner verification
			const announceOwner = await GetID.owner(id as number, "announce")
			if (owner_id !== announceOwner) throw ErrorMsg.htmlError(htmlError[403])

			// STORING FILE
			const fileOrigin = filePath.origin.image + file?.filename
			const fileStore = filePath.store.announce + file?.filename
			await FileManipulator.move(fileOrigin, fileStore)

			// DELETE OLD FILE
			// ... get the id
			await FileManipulator.delete("")

			// persist
			await dbClient.announce.update({
				where: {
					id: id as number,
					owner_id: owner_id,
				},
				data: {
					title: title,
					text: text,
					imagePath: fileStore,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))

			return res
		}
	}

	async delete(id: AnnounceID, userAuth?: UserAuthID): Promise<Reply<void>> {
		try {
			// owner verification
			const announceOwner = await GetID.owner(id as number, "announce")
			if (userAuth !== announceOwner) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			await dbClient.announce.delete({
				where: {
					id: id,
				},
			})

			// RESPONSE
			return new Reply<void>()
		} catch (error) {
			const res = new Reply<void>(undefined, new ErrorMsg(`Error: failed to delete`, 500))

			return res
		}
	}

	async get(id: AnnounceID): Promise<Reply<IAnnounceSucc>> {
		try {
			const announce = await dbClient.announce.findUnique({
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

			// RESPONSE
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
			const announces = await dbClient.announce.findMany({
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

			// RESPONSE
			return new Reply<IAnnouncesListSucc>(list)
		} catch (error) {
			return new Reply<IAnnouncesListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async findManyByArtist(id: AnnounceID): Promise<Reply<IAnnouncesListSucc>> {
		try {
			const artistID = id

			const announces = await dbClient.announce.findMany({
				where: {
					owner_id: artistID,
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

			// RESPONSE
			return new Reply<IAnnouncesListSucc>(list)
		} catch (error) {
			return new Reply<IAnnouncesListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}
}
