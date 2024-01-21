import { Announce, AnnouncesRepository } from "Domain"
import { Reply, getArtistID, dbClient } from "../../assets"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	ErrorMsg,
	IAnnouncesListItemSucc,
	apiErrorMsg,
	AnnounceID,
	UserAuthID,
} from "Shared"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(data: Announce, file?: File): Promise<Reply<boolean>> {
		try {
			const { owner_id, title, text } = data

			// Storing files
			console.log(file)

			await dbClient.announce.create({
				data: {
					owner_id: owner_id as number,
					title: title,
					text: text,
					imageUrl: "",
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))

			return res
		}
	}

	async modify(data: Announce, file?: File): Promise<Reply<boolean>> {
		try {
			const { owner_id, title, text, imageUrl, id } = data

			// owner verification
			const announce = await dbClient.announce.findUnique(getArtistID(id as number))
			if (owner_id !== announce?.owner_id) throw new ErrorMsg(403, apiErrorMsg.e403)

			// Storing files
			console.log(file)

			// persist
			await dbClient.announce.update({
				where: {
					id: id as number,
					owner_id: owner_id,
				},
				data: {
					title: title,
					text: text,
					imageUrl: imageUrl,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))

			return res
		}
	}

	async delete(id: AnnounceID, userAuth?: UserAuthID): Promise<Reply<void>> {
		try {
			// owner verification
			const announce = await dbClient.announce.findUnique(getArtistID(id))
			if (userAuth !== announce?.owner_id) throw new ErrorMsg(403, apiErrorMsg.e403)

			// persist
			await dbClient.announce.delete({
				where: {
					id: id,
				},
			})

			// RESPONSE
			return new Reply<void>()
		} catch (error) {
			const res = new Reply<void>(
				undefined,
				new ErrorMsg(500, `Error: failed to delete`, error)
			)

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
					imageUrl: true,
				},
			})

			// RESPONSE
			return new Reply<IAnnounceSucc>({
				id: id,
				owner_id: id,
				title: announce?.title,
				text: announce?.text,
				imageUrl: announce?.imageUrl,
			})
		} catch (error) {
			return new Reply<IAnnounceSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async getAll(): Promise<Reply<IAnnouncesListSucc>> {
		try {
			const announces = await dbClient.announce.findMany({
				select: {
					id: true,
					owner_id: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = announces.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					owner_id: announce.owner_id,
					title: announce.title,
					imageUrl: announce.imageUrl,
				}
			})

			// RESPONSE
			return new Reply<IAnnouncesListSucc>(list)
		} catch (error) {
			return new Reply<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(500, apiErrorMsg.e500, error)
			)
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
					imageUrl: true,
				},
			})

			// Reorganize
			const list = announces.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					owner_id: announce.owner_id,
					title: announce.title,
					imageUrl: announce.imageUrl,
				}
			})

			// RESPONSE
			return new Reply<IAnnouncesListSucc>(list)
		} catch (error) {
			return new Reply<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(500, apiErrorMsg.e500, error)
			)
		}
	}
}
