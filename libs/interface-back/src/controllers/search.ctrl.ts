import {
	htmlError,
	ErrorMsg,
	ExpressRequest,
	ExpressResponse,
	SearchResponseDTO,
	GetEventShortDTO,
	GetShortRecordDTO,
	GenreType,
	GetSongDTO,
	RecordType,
} from "Shared"
import { ApiErrorHandler } from "../assets"
import {
	AnnouncesService,
	ArtistsService,
	EventsService,
	LabelsService,
	PlayAtEventService,
	RecordArtistService,
	RecordsService,
	SearchAnnouncesUsecase,
	SearchArtistFeatsUsecase,
	SearchArtistsUsecase,
	SearchEventsUsecase,
	SearchLabelsUsecase,
	SearchPlayAtEventUsecase,
	SearchRecordArtistUsecase,
	SearchRecordsUsecase,
	SearchSongsUsecase,
	SongFeatService,
	SongsService,
} from "Application"
import {
	AnnouncesImplement,
	ArtistsImplement,
	EventsImplement,
	LabelsImplement,
	PlayAtEventImplement,
	RecordArtistImplement,
	RecordsImplement,
	SongFeatImplement,
	SongsImplement,
} from "Infra-backend"
import { apiUriRequest, apiUrlsearch } from "../assets"

export class SearchController {
	async global(req: ExpressRequest, res: ExpressResponse): Promise<void | ExpressResponse> {
		if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

		const query = req.query?.["q"] as string
		const date = req.query?.["date"] as string
		const artistID = req.query?.["artist-id"] as string
		const genre = req.query?.["genre"] as string
		const place = req.query?.["place"] as string
		const country = req.query?.["country"] as string
		const recordID = req.query?.["record"] as string
		const recordGenre = req.query?.["record-genre"] as string
		const feats = req.query?.["feats"] as string
		const recordType = req.query?.["record-type"] as string

		// Searchs
		switch (query) {
			case "artists":
				try {
					const reqGenre = genre ? apiUriRequest.genre + genre : ""
					const reqCountry = country ? apiUriRequest.country + country : ""
					const path = apiUrlsearch.artists + reqGenre + reqCountry

					res.redirect(`${path}`)
					break
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			case "label":
				try {
					const reqCountry = genre ? apiUriRequest.country + country : ""
					const path = apiUrlsearch.artists + reqCountry

					res.redirect(`${path}`)
					break
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			case "records":
				try {
					const reqGenre = genre ? apiUriRequest.genre + genre : ""
					const reqDate = date ? apiUriRequest.date + date : ""
					const reqArtistID = artistID ? apiUriRequest.artistID + artistID : ""
					const reqFeats = feats ? apiUriRequest.artistFeatsID + feats : ""
					const reqRecordType = recordType ? apiUriRequest.recordType + recordType : ""
					const path =
						apiUrlsearch.artists +
						reqGenre +
						reqDate +
						reqArtistID +
						reqFeats +
						reqRecordType

					res.redirect(`${path}`)
					break
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			case "songs":
				try {
					const reqArtistID = artistID ? apiUriRequest.artistID + artistID : ""
					const reqRecordGenre = recordGenre
						? apiUriRequest.recordGenre + recordGenre
						: ""
					const reqRecordID = recordID ? apiUriRequest.recordID + recordID : ""
					const path = apiUrlsearch.artists + reqArtistID + reqRecordGenre + reqRecordID

					res.redirect(`${path}`)
					break
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			case "events":
				try {
					const reqArtistID = artistID ? apiUriRequest.artistID + artistID : ""
					const reqGenre = genre ? apiUriRequest.genre + genre : ""
					const reqDate = date ? apiUriRequest.date + date : ""
					const reqPlace = place ? apiUriRequest.place : ""
					const path = apiUrlsearch.artists + reqDate + reqGenre + reqArtistID + reqPlace

					res.redirect(`${path}`)
					break
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			case "announces":
				try {
					const reqGenre = genre ? apiUriRequest.genre + genre : ""
					const reqArtistID = artistID ? apiUriRequest.artistID + artistID : ""
					const path = apiUrlsearch.artists + reqGenre + reqArtistID

					res.redirect(`${path}`)
					break
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}

			default:
				return res.status(400).end()
		}
	}

	async artists(req: ExpressRequest, res: ExpressResponse) {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const genre = req.query?.["genre"] as string
			const country = req.query?.["country"] as string

			// Services
			const artistsImplement = new ArtistsImplement()
			const artistsService = new ArtistsService(artistsImplement)

			// Calling database
			const searchArtists = new SearchArtistsUsecase(artistsService)
			const { data, error } = await searchArtists.execute(genre as GenreType, country)

			// RETURN RESULTS
			return res.status(200).send({ data, error })
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async labels(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const country = req.query?.["country"] as string

			// Services
			const labelsImplement = new LabelsImplement()
			const labelsService = new LabelsService(labelsImplement)

			// Calling database
			const searchLabels = new SearchLabelsUsecase(labelsService)
			const { data, error } = await searchLabels.execute(country)

			// RETURN RESULTS
			return res.status(200).send({ data, error })
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async announces(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const date = req.query?.["date"] as unknown
			const artistID = req.query?.["artist-id"] as unknown

			// Services
			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)

			// Calling database
			const searchAnnounces = new SearchAnnouncesUsecase(announcesService)
			const { data, error } = await searchAnnounces.execute(artistID as number, date as Date)

			// RETURN RESULTS
			return res.status(200).send({ data, error })
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
	async events(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const results: GetEventShortDTO[] = []
			const errors: ErrorMsg[] = []

			const date = req.query?.["date"] as unknown
			const artistID = req.query?.["artist-id"] as unknown
			const genre = req.query?.["genre"] as string
			const place = req.query?.["place"] as string

			// MAIN REPOS
			const eventsImplement = new EventsImplement()
			const eventsService = new EventsService(eventsImplement)
			const searchEventsUsecase = new SearchEventsUsecase(eventsService)
			const resultsSearchEvents = await searchEventsUsecase.execute(date as Date, place)

			if (resultsSearchEvents.data) results.push(...resultsSearchEvents.data)
			if (resultsSearchEvents.error) errors.push(resultsSearchEvents.error)

			// RELATIONNAL REPOS
			const playAtEventImplement = new PlayAtEventImplement()
			const playAtEventService = new PlayAtEventService(playAtEventImplement)
			const searchPlayAtEventUsecase = new SearchPlayAtEventUsecase(playAtEventService)
			const resultsSearchPlayAtEvent = await searchPlayAtEventUsecase.execute(
				artistID as number,
				genre as GenreType
			)

			if (resultsSearchPlayAtEvent.data) results.push(...resultsSearchPlayAtEvent.data)
			if (resultsSearchPlayAtEvent.error) errors.push(resultsSearchPlayAtEvent.error)

			// RETURN RESULTS
			const reponse = new SearchResponseDTO([...new Set(results)], errors)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async records(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const results: GetShortRecordDTO[] = []
			const errors: ErrorMsg[] = []

			const date = req.query?.["date"] as unknown
			const artistID = req.query?.["artist-id"] as unknown
			const genre = req.query?.["genre"] as string
			const recordType = req.query?.["record-type"] as string

			// MAIN REPOS
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)
			const searchRecordsUsecase = new SearchRecordsUsecase(recordsService)
			const resultsSearchRecords = await searchRecordsUsecase.execute(
				genre as GenreType,
				date as Date,
				recordType as RecordType
			)

			if (resultsSearchRecords.data) results.push(...resultsSearchRecords.data)
			if (resultsSearchRecords.error) errors.push(resultsSearchRecords.error)

			// RELATIONNAL REPOS
			const recordArtistImplement = new RecordArtistImplement()
			const recordArtistService = new RecordArtistService(recordArtistImplement)
			const searchSearchRecordArtist = new SearchRecordArtistUsecase(recordArtistService)
			const resultsSearchRecordArtist = await searchSearchRecordArtist.execute(
				artistID as number
			)

			if (resultsSearchRecordArtist.data) results.push(...resultsSearchRecordArtist.data)
			if (resultsSearchRecordArtist.error) errors.push(resultsSearchRecordArtist.error)

			// RETURN RESULTS
			const reponse = new SearchResponseDTO([...new Set(results)], errors)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async songs(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const artistID = req.query?.["artist-id"] as unknown
			const recordID = req.query?.["record"] as unknown
			const recordGenre = req.query?.["record-genre"] as string

			const results: GetSongDTO[] = []
			const errors: ErrorMsg[] = []

			// MAIN REPOS
			const songsImplement = new SongsImplement()
			const songsService = new SongsService(songsImplement)
			const searchSongs = new SearchSongsUsecase(songsService)
			const resultsSearchSongs = await searchSongs.execute(
				recordID as number,
				artistID as number,
				recordGenre as GenreType
			)

			if (resultsSearchSongs.data) results.push(...resultsSearchSongs.data)
			if (resultsSearchSongs.error) errors.push(resultsSearchSongs.error)

			// RELATIONNAL REPOS
			const songFeatImplement = new SongFeatImplement()
			const songFeatService = new SongFeatService(songFeatImplement)
			const searchArtistFeats = new SearchArtistFeatsUsecase(songFeatService)
			const resultsSearchArtistFeats = await searchArtistFeats.execute(artistID as number)

			if (resultsSearchArtistFeats.data) results.push(...resultsSearchArtistFeats.data)
			if (resultsSearchArtistFeats.error) errors.push(resultsSearchArtistFeats.error)

			// RETURN RESULTS
			const reponse = new SearchResponseDTO([...new Set(results)], errors)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
