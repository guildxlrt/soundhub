import { ErrorMsg } from "Shared"
import { dbClient } from "./client"

export class GetID {
	static async owner(id: number, target: "announce" | "event" | "release") {
		const params = {
			where: {
				id: id,
			},
			select: {
				owner_id: true,
			},
		}
		if (target === "announce") {
			const announce = await dbClient.announce.findUnique(params)
			return announce?.owner_id
		}
		if (target === "event") {
			const event = await dbClient.event.findUnique(params)
			return event?.owner_id
		}
		if (target === "release") {
			const release = await dbClient.release.findUnique(params)
			return release?.owner_id
		} else throw new ErrorMsg("Error verifying auths")
	}

	static async profile(id: number) {
		const user = await dbClient.artist.findUnique({
			where: {
				user_auth_id: id,
			},
			select: {
				id: true,
			},
		})

		return user?.id
	}

	static async auth(id: number) {
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
