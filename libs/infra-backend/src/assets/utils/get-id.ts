import { dbClient } from "../client"

export class GetID {
	static artist(id: number | undefined) {
		return {
			where: {
				id: id,
			},
			select: {
				owner_id: true,
			},
		}
	}

	static async auth(id: number | undefined) {
		const user = await dbClient.artist.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
			},
		})

		return user?.id
	}
}
