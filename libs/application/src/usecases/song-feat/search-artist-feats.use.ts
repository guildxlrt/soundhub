import { UsecaseReply } from "../../utils"
import { ArtistProfileID, ErrorHandler, GetSongDTO } from "Shared"
import { SongFeatService } from "../../services"

export class SearchArtistFeatsUsecase {
	mainService: SongFeatService

	constructor(mainService: SongFeatService) {
		this.mainService = mainService
	}
	async execute(id: ArtistProfileID): Promise<UsecaseReply<GetSongDTO[]>> {
		try {
			const data = await this.mainService.search(id)
			return new UsecaseReply<GetSongDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
