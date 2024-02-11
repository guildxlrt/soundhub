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
	GetAnnounceShortDTO,
	SearchResponseDTO,
	GetEventShortDTO,
	GetSongDTO,
	GetShortReleaseDTO,
	GetArtistShortDTO,
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
		const releaseGenre = req.query?.["release-genre"] as string
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
			case "artists":
				try {
					if (!genre) throw ErrorMsg.htmlError(htmlError[400])

					const results: GetArtistShortDTO[] = []
					const errors: ErrorMsg[] = []

					if (genre) {
						const params = new GenreUsecaseParams(genre)

						// Calling database
						const findArtistsByGenre = new FindArtistsByGenreUsecase(artistsService)
						const resultsByGenre = await findArtistsByGenre.execute(params)

						if (resultsByGenre.data) results.push(...resultsByGenre.data)
						if (resultsByGenre.error) errors.push(resultsByGenre.error)
					}

					// RETURN RESULTS
					const reponse = new SearchResponseDTO([...new Set(results)], errors)
					return res.status(200).send(reponse)
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			case "releases":
				try {
					if (!date || !genre || !artistID || !feats || !releaseType)
						throw ErrorMsg.htmlError(htmlError[400])

					const results: GetShortReleaseDTO[] = []
					const errors: ErrorMsg[] = []

					if (artistID) {
						const params = IDUsecaseParams.fromBackend(artistID)

						// Calling database
						const findReleasesByArtist = new FindReleasesByArtistUsecase(
							releasesService
						)
						const resultsByArtist = await findReleasesByArtist.execute(params)

						if (resultsByArtist.data) results.push(...resultsByArtist.data)
						if (resultsByArtist.error) errors.push(resultsByArtist.error)
					}
					if (feats) {
						if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

						const id = req.params["id"]
						const params = IDUsecaseParams.fromBackend(id)

						// Calling database
						const findManyByArtistFeats = new FindReleasesByArtistFeatsUsecase(
							releasesService
						)
						const resultsByArtistFeats = await findManyByArtistFeats.execute(params)

						if (resultsByArtistFeats.data) results.push(...resultsByArtistFeats.data)
						if (resultsByArtistFeats.error) errors.push(resultsByArtistFeats.error)
					}

					if (genre) {
						const params = new GenreUsecaseParams(genre)

						// Calling database
						const findReleasesByGenre = new FindReleasesByGenreUsecase(releasesService)
						const resultsByGenre = await findReleasesByGenre.execute(params)

						if (resultsByGenre.data) results.push(...resultsByGenre.data)
						if (resultsByGenre.error) errors.push(resultsByGenre.error)
					}

					if (date) {
						const params = DateUsecaseParams.fromBackend(date)

						// Calling database
						const findEventsByDate = new FindReleasesByDateUsecase(releasesService)
						const resultsByDate = await findEventsByDate.execute(params)

						if (resultsByDate.data) results.push(...resultsByDate.data)
						if (resultsByDate.error) errors.push(resultsByDate.error)
					}
					if (releaseType) {
						try {
							const params = new ReleaseTypeUsecaseParams(releaseType)

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

					// RETURN RESULTS
					const reponse = new SearchResponseDTO([...new Set(results)], errors)
					return res.status(200).send(reponse)
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			case "songs":
				try {
					if (!artistID || !releaseID || !releaseGenre)
						throw ErrorMsg.htmlError(htmlError[400])

					const results: GetSongDTO[] = []
					const errors: ErrorMsg[] = []

					if (artistID) {
						const params = IDUsecaseParams.fromBackend(artistID)

						// Calling database
						const getSong = new FindSongsByArtistUsecase(songsService)
						const resultsByArtist = await getSong.execute(params)

						if (resultsByArtist.data) results.push(...resultsByArtist.data)
						if (resultsByArtist.error) errors.push(resultsByArtist.error)
					}

					if (releaseID) {
						const params = IDUsecaseParams.fromBackend(releaseID)

						// Calling database
						const getSong = new FindSongsByReleaseUsecase(songsService)
						const resultsByRelease = await getSong.execute(params)

						if (resultsByRelease.data) results.push(...resultsByRelease.data)
						if (resultsByRelease.error) errors.push(resultsByRelease.error)
					}
					if (releaseGenre) {
						if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

						const genre = req.params["genre"] as GenreType
						const params = new GenreUsecaseParams(genre)

						// Calling database
						const getSong = new FindSongsByReleaseGenreUsecase(songsService)
						const resultsByGenre = await getSong.execute(params)

						if (resultsByGenre.data) results.push(...resultsByGenre.data)
						if (resultsByGenre.error) errors.push(resultsByGenre.error)
					}

					// RETURN RESULTS
					const reponse = new SearchResponseDTO([...new Set(results)], errors)
					return res.status(200).send(reponse)
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			case "events":
				try {
					if (!date || !genre || !artistID || !place)
						throw ErrorMsg.htmlError(htmlError[400])

					const results: GetEventShortDTO[] = []
					const errors: ErrorMsg[] = []

					if (artistID) {
						const params = IDUsecaseParams.fromBackend(artistID)
						const findEventsByArtist = new FindEventsByArtistUsecase(eventsService)
						const resultsByArtist = await findEventsByArtist.execute(params)

						if (resultsByArtist.data) results.push(...resultsByArtist.data)
						if (resultsByArtist.error) errors.push(resultsByArtist.error)
					}
					if (date) {
						const params = DateUsecaseParams.fromBackend(date)
						const findEventsByDate = new FindEventsByDateUsecase(eventsService)
						const resultsByDate = await findEventsByDate.execute(params)

						if (resultsByDate.data) results.push(...resultsByDate.data)
						if (resultsByDate.error) errors.push(resultsByDate.error)
					}
					if (genre) {
						const params = new PlaceUsecaseParams(genre)
						const findEventsByPlace = new FindEventsByPlaceUsecase(eventsService)
						const resultsByGenre = await findEventsByPlace.execute(params)

						if (resultsByGenre.data) results.push(...resultsByGenre.data)
						if (resultsByGenre.error) errors.push(resultsByGenre.error)
					}
					if (place) {
						const params = new GenreUsecaseParams(place)
						const findEventsByGenre = new FindEventsByArtistGenreUsecase(eventsService)
						const resultsByPlace = await findEventsByGenre.execute(params)

						if (resultsByPlace.data) results.push(...resultsByPlace.data)
						if (resultsByPlace.error) errors.push(resultsByPlace.error)
					}

					// RETURN RESULTS
					const reponse = new SearchResponseDTO([...new Set(results)], errors)
					return res.status(200).send(reponse)
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			case "announces":
				try {
					if (!genre || !artistID) throw ErrorMsg.htmlError(htmlError[400])

					const results: GetAnnounceShortDTO[] = []
					const errors: ErrorMsg[] = []

					if (artistID) {
						const params = IDUsecaseParams.fromBackend(artistID)
						const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(
							announcesService
						)
						const resultsByArtist = await findAnnouncesByArtist.execute(params)

						if (resultsByArtist.data) results.push(...resultsByArtist.data)
						if (resultsByArtist.error) errors.push(resultsByArtist.error)
					}
					if (date) {
						const params = DateUsecaseParams.fromBackend(date)
						const findAnnouncesByArtist = new FindAnnouncesByDateUsecase(
							announcesService
						)
						const resultsByDate = await findAnnouncesByArtist.execute(params)

						if (resultsByDate.data) results.push(...resultsByDate.data)
						if (resultsByDate.error) errors.push(resultsByDate.error)
					}

					// RETURN RESULTS
					const reponse = new SearchResponseDTO([...new Set(results)], errors)
					return res.status(200).send(reponse)
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			default:
				return res.status(400).end()
		}
	}
}
