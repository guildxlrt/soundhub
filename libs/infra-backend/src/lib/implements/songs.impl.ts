import { SongsRepository } from "Domain"
import { Reply, dbClient } from "../../assets"
import { SongID, ISongSucc, ErrorMsg, apiError } from "Shared"

export class SongsImplement implements SongsRepository {
	async get(id: SongID): Promise<Reply<ISongSucc>> {
		try {
			const song = await dbClient.song.findUnique({
				where: {
					id: id,
				},
				select: {
					release_id: true,
					audioUrl: true,
					title: true,
					featuring: true,
					lyrics: true,
				},
			})

			// RESPONSE
			return new Reply<ISongSucc>({
				id: id,
				release_id: song?.release_id,
				audioUrl: song?.audioUrl,
				title: song?.title,
				featuring: song?.featuring,
				lyrics: song?.lyrics,
			})
		} catch (error) {
			return new Reply<ISongSucc>(undefined, ErrorMsg.apiError(apiError[500]))
		}
	}
}
