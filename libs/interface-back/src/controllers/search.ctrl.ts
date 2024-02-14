import {
	AnnouncesImplement,
	ArtistsImplement,
	EventsImplement,
	PlayAtEventImplement,
	RecordArtistImplement,
	RecordsImplement,
	SongFeatImplement,
	SongsImplement,
} from "Infra-backend"
import {
	FindAnnouncesByArtistUsecase,
	IDUsecaseParams,
	AnnouncesService,
	FindAnnouncesByDateUsecase,
	DateUsecaseParams,
	EventsService,
	FindEventsByDateUsecase,
	PlaceUsecaseParams,
	FindEventsByPlaceUsecase,
	GenreUsecaseParams,
	SongsService,
	FindSongsByRecordUsecase,
	FindSongsByRecordGenreUsecase,
	FindSongsByArtistUsecase,
	RecordsService,
	FindRecordsByGenreUsecase,
	FindRecordsByDateUsecase,
	RecordTypeUsecaseParams,
	FindRecordsByTypeUsecase,
	ArtistsService,
	FindArtistsByGenreUsecase,
	FindRecordsByArtistUsecase,
	FindSongsByArtistFeatsUsecase,
	FindEventsByArtistUsecase,
	FindEventsByArtistGenreUsecase,
	RecordArtistService,
	SongFeatService,
	PlayAtEventService,
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
	GetShortRecordDTO,
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
		const recordID = req.query?.["record"] as string
		const recordGenre = req.query?.["record-genre"] as string
		const feats = req.query?.["feats"] as string
		const recordType = req.query?.["record-type"] as string

		// Services
		const artistsImplement = new ArtistsImplement()
		const artistsService = new ArtistsService(artistsImplement)
		const recordsImplement = new RecordsImplement()
		const recordsService = new RecordsService(recordsImplement)
		const songsImplement = new SongsImplement()
		const songsService = new SongsService(songsImplement)
		const announcesImplement = new AnnouncesImplement()
		const announcesService = new AnnouncesService(announcesImplement)
		const eventsImplement = new EventsImplement()
		const eventsService = new EventsService(eventsImplement)
		const recordArtistImplement = new RecordArtistImplement()
		const recordArtistService = new RecordArtistService(recordArtistImplement)
		const songFeatImplement = new SongFeatImplement()
		const songFeatService = new SongFeatService(songFeatImplement)
		const playAtEventImplement = new PlayAtEventImplement()
		const playAtEventService = new PlayAtEventService(playAtEventImplement)

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

			case "records":
				try {
					if (!date || !genre || !artistID || !feats || !recordType)
						throw ErrorMsg.htmlError(htmlError[400])

					const results: GetShortRecordDTO[] = []
					const errors: ErrorMsg[] = []

					if (artistID) {
						const params = IDUsecaseParams.fromBackend(artistID)

						// Calling database
						const findRecordsByArtist = new FindRecordsByArtistUsecase(
							recordArtistService
						)
						const resultsByArtist = await findRecordsByArtist.execute(params)

						if (resultsByArtist.data) results.push(...resultsByArtist.data)
						if (resultsByArtist.error) errors.push(resultsByArtist.error)
					}
					if (feats) {
						if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

						const id = req.params["id"]
						const params = IDUsecaseParams.fromBackend(id)

						// Calling database
						const findByArtistFeats = new FindSongsByArtistFeatsUsecase(songFeatService)
						const resultsByArtistFeats = await findByArtistFeats.execute(params)

						if (resultsByArtistFeats.data) results.push(...resultsByArtistFeats.data)
						if (resultsByArtistFeats.error) errors.push(resultsByArtistFeats.error)
					}

					if (genre) {
						const params = new GenreUsecaseParams(genre)

						// Calling database
						const findRecordsByGenre = new FindRecordsByGenreUsecase(recordsService)
						const resultsByGenre = await findRecordsByGenre.execute(params)

						if (resultsByGenre.data) results.push(...resultsByGenre.data)
						if (resultsByGenre.error) errors.push(resultsByGenre.error)
					}

					if (date) {
						const params = DateUsecaseParams.fromBackend(date)

						// Calling database
						const findEventsByDate = new FindRecordsByDateUsecase(recordsService)
						const resultsByDate = await findEventsByDate.execute(params)

						if (resultsByDate.data) results.push(...resultsByDate.data)
						if (resultsByDate.error) errors.push(resultsByDate.error)
					}
					if (recordType) {
						try {
							const params = new RecordTypeUsecaseParams(recordType)

							// Calling database
							const findEventsByDate = new FindRecordsByTypeUsecase(recordsService)
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
					if (!artistID || !recordID || !recordGenre)
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

					if (recordID) {
						const params = IDUsecaseParams.fromBackend(recordID)

						// Calling database
						const getSong = new FindSongsByRecordUsecase(songsService)
						const resultsByRecord = await getSong.execute(params)

						if (resultsByRecord.data) results.push(...resultsByRecord.data)
						if (resultsByRecord.error) errors.push(resultsByRecord.error)
					}
					if (recordGenre) {
						if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

						const genre = req.params["genre"] as GenreType
						const params = new GenreUsecaseParams(genre)

						// Calling database
						const getSong = new FindSongsByRecordGenreUsecase(songsService)
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
						const findEventsByArtist = new FindEventsByArtistUsecase(
							playAtEventService,
							artistsService
						)
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
					if (place) {
						const params = new PlaceUsecaseParams(place)
						const findEventsByPlace = new FindEventsByPlaceUsecase(eventsService)
						const resultsByGenre = await findEventsByPlace.execute(params)

						if (resultsByGenre.data) results.push(...resultsByGenre.data)
						if (resultsByGenre.error) errors.push(resultsByGenre.error)
					}
					if (genre) {
						const params = new GenreUsecaseParams(genre)
						const findEventsByGenre = new FindEventsByArtistGenreUsecase(
							playAtEventService,
							artistsService
						)
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
