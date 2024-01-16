import { dbClient } from "./client"

export const getArtistID = (id: number | undefined) => {
	return {
		where: {
			id: id,
		},
		select: {
			owner_id: true,
		},
	}
}

export const getAuthID = async (id: number | undefined) => {
	return await dbClient.artist.findUnique({
		where: {
			id: id,
		},
		select: {
			id: true,
		},
	})
}
