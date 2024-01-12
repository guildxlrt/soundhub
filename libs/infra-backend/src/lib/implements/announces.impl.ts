import { Reply, dbClient } from "../../assets"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	AnnouncesRepository,
	EntityId,
	NewAnnounceParams,
	ModifyAnnounceParams,
	ErrorMsg,
	IAnnouncesListItemSucc,
	DeleteAnnounceParams,
} from "Shared"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(inputs: NewAnnounceParams): Promise<Reply<boolean>> {
		const { data } = inputs
		const { owner_id, title, text, imageUrl, videoUrl } = data

		try {
			// Storing files
			// ...

			await dbClient.announce.create({
				data: {
					owner_id: owner_id as number,
					title: title,
					text: text,
					imageUrl: imageUrl,
					videoUrl: videoUrl,
				},
			})

			// Response
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(
				false,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			return res
		}
	}

	async modify(inputs: ModifyAnnounceParams): Promise<Reply<boolean>> {
		try {
			const { owner_id, title, text, imageUrl, videoUrl, id } = inputs.data

			// Storing files
			await dbClient.announce.update({
				where: {
					id: id,
				},
				data: {
					owner_id: owner_id as number,
					title: title,
					text: text,
					imageUrl: imageUrl,
					videoUrl: videoUrl,
				},
			})

			// Response
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(
				false,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			return res
		}
	}

	async delete(inputs: DeleteAnnounceParams): Promise<Reply<void>> {
		try {
			const { id, userAuth } = inputs

			console.log(userAuth)

			await dbClient.announce.delete({
				where: {
					id: id,
				},
			})

			return new Reply<void>()
		} catch (error) {
			const res = new Reply<void>(
				undefined,
				new ErrorMsg(500, `Error: failed to delete`, error)
			)

			return res
		}
	}

	async get(id: EntityId): Promise<Reply<IAnnounceSucc>> {
		try {
			const data = await dbClient.announce.findUnique({
				where: {
					id: id,
				},
				select: {
					owner_id: true,
					title: true,
					text: true,
					imageUrl: true,
					videoUrl: true,
				},
			})

			// Response
			return new Reply<IAnnounceSucc>({
				id: id,
				owner_id: id,
				title: data?.title,
				text: data?.text,
				imageUrl: data?.text,
				videoUrl: data?.videoUrl,
			})
		} catch (error) {
			return new Reply<IAnnounceSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}

	async getAll(): Promise<Reply<IAnnouncesListSucc>> {
		try {
			const data = await dbClient.announce.findMany({
				select: {
					id: true,
					owner_id: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					owner_id: announce.owner_id,
					title: announce.title,
					imageUrl: announce.imageUrl,
				}
			})

			// Response
			return new Reply<IAnnouncesListSucc>(list)
		} catch (error) {
			return new Reply<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}

	async findManyByArtist(id: EntityId): Promise<Reply<IAnnouncesListSucc>> {
		const artistId = id

		try {
			const data = await dbClient.announce.findMany({
				where: {
					owner_id: artistId,
				},
				select: {
					id: true,
					owner_id: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					owner_id: announce.owner_id,
					title: announce.title,
					imageUrl: announce.imageUrl,
				}
			})

			// Response
			return new Reply<IAnnouncesListSucc>(list)
		} catch (error) {
			return new Reply<IAnnouncesListSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
