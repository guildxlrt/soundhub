import {
	AnnouncesImplement,
	ArtistsImplement,
	EventsImplement,
	ReleasesImplement,
	SongsImplement,
} from "Infra-backend"
import {
	FindAnnouncesByArtistUsecase,
	IDUsecaseParams,
	AnnouncesService,
	FindAnnouncesByDateUsecase,
	DateUsecaseParams,
	EventsService,
	FindEventsByArtistUsecase,
	FindEventsByDateUsecase,
	PlaceUsecaseParams,
	FindEventsByPlaceUsecase,
	GenreUsecaseParams,
	FindEventsByArtistGenreUsecase,
	SongsService,
	FindSongsByReleaseUsecase,
	FindSongsByReleaseGenreUsecase,
	FindSongsByArtistUsecase,
	ReleasesService,
	FindReleasesByArtistUsecase,
	FindReleasesByArtistFeatsUsecase,
	FindReleasesByGenreUsecase,
	FindReleasesByDateUsecase,
	ReleaseTypeUsecaseParams,
	FindReleasesByTypeUsecase,
	ArtistsService,
	FindArtistsByGenreUsecase,
} from "Application"
import {
	htmlError,
	ResponseDTO,
	ErrorMsg,
	ExpressRequest,
	ExpressResponse,
	GenreType,
} from "Shared"
import { ApiErrorHandler } from "../assets"

export class SearchController {
	async findMany(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

		const query = req.query?.["q"] as string

		const date = req.query?.["date"] as string
		const artistID = req.query?.["artist-id"] as string
		const genre = req.query?.["genre"] as string
		const place = req.query?.["place"] as string
		const releaseID = req.query?.["release"] as string
		const releaseGenre = req.query?.["genre"] as string
		const feats = req.query?.["feats"] as string
		const releaseType = req.query?.["release-type"] as string

		// Services
		const artistsImplement = new ArtistsImplement()
		const artistsService = new ArtistsService(artistsImplement)
		const releasesImplement = new ReleasesImplement()
		const releasesService = new ReleasesService(releasesImplement)
		const songsImplement = new SongsImplement()
		const songsService = new SongsService(songsImplement)
		const announcesImplement = new AnnouncesImplement()
		const announcesService = new AnnouncesService(announcesImplement)
		const eventsImplement = new EventsImplement()
		const eventsService = new EventsService(eventsImplement)

		// Searchs
		switch (query) {
			case "artist":
				try {
					if (genre) {
						const params = new GenreUsecaseParams(genre)

						// Calling database
						const findArtistsByGenre = new FindArtistsByGenreUsecase(artistsService)
						const { data, error } = await findArtistsByGenre.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}

					if (!genre) throw ErrorMsg.htmlError(htmlError[400])
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

				break

			case "releases":
				try {
					if (artistID) {
						const params = new IDUsecaseParams(artistID)

						// Calling database
						const findReleasesByArtist = new FindReleasesByArtistUsecase(
							releasesService
						)
						const { data, error } = await findReleasesByArtist.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}
					if (feats) {
						if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

						const id = req.params["id"]
						const params = new IDUsecaseParams(id)

						// Calling database
						const findManyByArtistFeats = new FindReleasesByArtistFeatsUsecase(
							releasesService
						)
						const { data, error } = await findManyByArtistFeats.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}

					if (genre) {
						const params = new GenreUsecaseParams(genre)

						// Calling database
						const findReleasesByGenre = new FindReleasesByGenreUsecase(releasesService)
						const { data, error } = await findReleasesByGenre.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}

					if (date) {
						const params = DateUsecaseParams.fromReqParams(date)

						// Calling database
						const findEventsByDate = new FindReleasesByDateUsecase(releasesService)
						const { data, error } = await findEventsByDate.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}
					if (releaseType) {
						try {
							const params = ReleaseTypeUsecaseParams.fromReqParams(releaseType)

							// Calling database
							const findEventsByDate = new FindReleasesByTypeUsecase(releasesService)
							const { data, error } = await findEventsByDate.execute(params)

							if (error) throw error
							if (!data) throw ErrorMsg.htmlError(htmlError[500])

							const reponse = new ResponseDTO(data, error)
							return res.status(200).send(reponse)
						} catch (error) {
							return ApiErrorHandler.reply(error, res)
						}
					}

					if (!date || !genre || !artistID || !feats || !releaseType)
						throw ErrorMsg.htmlError(htmlError[400])
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

				break

			case "songs":
				try {
					if (artistID) {
						const params = new IDUsecaseParams(artistID)

						// Calling database
						const getSong = new FindSongsByArtistUsecase(songsService)
						const { data, error } = await getSong.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}

					if (releaseID) {
						const params = new IDUsecaseParams(releaseID)

						// Calling database
						const getSong = new FindSongsByReleaseUsecase(songsService)
						const { data, error } = await getSong.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}
					if (releaseGenre) {
						if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

						const genre = req.params["genre"] as GenreType
						const params = new GenreUsecaseParams(genre)

						// Calling database
						const getSong = new FindSongsByReleaseGenreUsecase(songsService)
						const { data, error } = await getSong.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}

					if (!artistID || !releaseID || !releaseGenre)
						throw ErrorMsg.htmlError(htmlError[400])
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

				break

			case "events":
				try {
					if (artistID) {
						const params = new IDUsecaseParams(artistID)

						// Calling database
						const findEventsByArtist = new FindEventsByArtistUsecase(eventsService)
						const { data, error } = await findEventsByArtist.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}
					if (date) {
						const params = DateUsecaseParams.fromReqParams(date)

						// Calling database
						const findEventsByDate = new FindEventsByDateUsecase(eventsService)
						const { data, error } = await findEventsByDate.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}
					if (genre) {
						const params = new PlaceUsecaseParams(genre)

						// Calling database
						const findEventsByPlace = new FindEventsByPlaceUsecase(eventsService)
						const { data, error } = await findEventsByPlace.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}
					if (place) {
						const params = new GenreUsecaseParams(place)

						// Calling database
						const findEventsByGenre = new FindEventsByArtistGenreUsecase(eventsService)
						const { data, error } = await findEventsByGenre.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}

					if (!date || !genre || !artistID || !place)
						throw ErrorMsg.htmlError(htmlError[400])
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}
				break

			case "announces":
				try {
					if (artistID) {
						const params = new IDUsecaseParams(artistID)

						// Calling database
						const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(
							announcesService
						)

						const { data, error } = await findAnnouncesByArtist.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}
					if (date) {
						const params = DateUsecaseParams.fromReqParams(date)

						// Calling database
						const findAnnouncesByArtist = new FindAnnouncesByDateUsecase(
							announcesService
						)

						const { data, error } = await findAnnouncesByArtist.execute(params)

						if (error) throw error
						if (!data) throw ErrorMsg.htmlError(htmlError[500])

						const reponse = new ResponseDTO(data, error)
						return res.status(200).send(reponse)
					}
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

				break

			default:
				break
		}

		return res.status(400).end()
	}
}
