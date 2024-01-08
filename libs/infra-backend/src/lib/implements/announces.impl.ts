import { Reply, dbClient } from "../../assets"
import {
	IAnnounceSucc,
	IAnnouncesListSucc,
	AnnouncesRepository,
	IdParams,
	NewAnnounceParams,
	ModifyAnnounceParams,
	ErrorMsg,
	IAnnouncesListItemSucc,
} from "Shared"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(inputs: NewAnnounceParams): Promise<Reply<boolean>> {
		const { artist_id, title, text, imageUrl, videoUrl } = inputs.data

		try {
			// Storing files
			// ...

			await dbClient.announce.create({
				data: {
					artist_id: artist_id as number,
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
		const { artist_id, title, text, imageUrl, videoUrl, id } = inputs.data

		try {
			// Storing files
			await dbClient.announce.update({
				where: {
					id: id,
				},
				data: {
					artist_id: artist_id as number,
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

	async delete(inputs: IdParams): Promise<Reply<void>> {
		const id = inputs.id

		try {
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

	async get(inputs: IdParams): Promise<Reply<IAnnounceSucc>> {
		const id = inputs.id

		try {
			const data = await dbClient.announce.findUnique({
				where: {
					id: id,
				},
				select: {
					artist_id: true,
					title: true,
					text: true,
					imageUrl: true,
					videoUrl: true,
				},
			})

			// Response
			return new Reply<IAnnounceSucc>({
				id: id,
				artist_id: id,
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
					artist_id: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					artist_id: announce.artist_id,
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

	async findManyByArtist(inputs: IdParams): Promise<Reply<IAnnouncesListSucc>> {
		const artistId = inputs.id

		try {
			const data = await dbClient.announce.findMany({
				where: {
					artist_id: artistId,
				},
				select: {
					id: true,
					artist_id: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((announce): IAnnouncesListItemSucc => {
				return {
					id: announce.id,
					artist_id: announce.artist_id,
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
