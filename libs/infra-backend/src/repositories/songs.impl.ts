import { SongsRepository } from "Domain"
import { Reply } from "../utils"
import { SongID, ISongSucc, ErrorMsg, htmlError } from "Shared"
import { dbClient } from "../database"

export class SongsImplement implements SongsRepository {
	private song = dbClient.song

	async get(id: SongID): Promise<Reply<ISongSucc>> {
		try {
			const song = await this.song.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					release_id: true,
					audioApth: true,
					title: true,
					featuring: true,
					lyrics: true,
				},
			})

			// RESPONSE
			return new Reply<ISongSucc>({
				id: id,
				release_id: song?.release_id,
				audioApth: song?.audioApth,
				title: song?.title,
				featuring: song?.featuring,
				lyrics: song?.lyrics,
			})
		} catch (error) {
			return new Reply<ISongSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}
}
