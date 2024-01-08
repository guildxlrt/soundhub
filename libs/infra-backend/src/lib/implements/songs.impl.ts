import { Reply, dbClient } from "../../assets"
import { IdParams, SongsRepository, ISongSucc, ErrorMsg } from "Shared"

export class SongsImplement implements SongsRepository {
	async get(inputs: IdParams): Promise<Reply<ISongSucc>> {
		const id = inputs.id

		try {
			const data = await dbClient.song.findUnique({
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

			// Response
			return new Reply<ISongSucc>({
				id: id,
				release_id: data?.release_id,
				audioUrl: data?.audioUrl,
				title: data?.title,
				featuring: data?.featuring,
				lyrics: data?.lyrics,
			})
		} catch (error) {
			return new Reply<ISongSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
