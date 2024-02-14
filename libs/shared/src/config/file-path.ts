export const filePath = {
	origin: {
		image: "tmp/image/",
		audio: "tmp/audio/",
	} as const,
	store: {
		announce: "store/images/announces/",
		event: "store/images/events/",
		artist: "store/images/logos/",
		record: "store/records/",
		song: "store/records/",
	} as const,
} as const

export type StoreFilePath = (typeof filePath.store)[keyof typeof filePath.store]
